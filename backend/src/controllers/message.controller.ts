import { Request, Response, NextFunction } from "express";
import prisma from "../db/prisma.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user.id;

        let conversation = await prisma.conversation.findFirst({
            where: {
                participantIds: {
                    hasEvery: [senderId, receiverId],
                },
            },
        });

        if (!conversation) {
            conversation = await prisma.conversation.create({
                data: {
                    participantIds: [senderId, receiverId],
                },
            });
        }

        const newMessage = await prisma.message.create({
            data: {
                senderId,
                body: message,
                conversationId: conversation.id,
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        fullName: true,
                        profileImage: true,
                    },
                },
            },
        });

        if (newMessage) {
            conversation = await prisma.conversation.update({
                where: {
                    id: conversation.id,
                },
                data: {
                    messages: {
                        connect: {
                            id: newMessage.id,
                        },
                    },
                },
            });
        }

        console.log("New message created:", newMessage); // Debug log

        const receiverSocketId = getReceiverSocketId(receiverId);
        
        if (receiverSocketId) {
            // Ensure message is in the expected format
            const messageToSend = {
                id: newMessage.id,
                body: newMessage.body,
                senderId: newMessage.senderId,
                receiverId,
                createdAt: newMessage.createdAt,
                sender: newMessage.sender
            };
            
            console.log("Emitting message:", messageToSend); // Debug log
            io.to(receiverSocketId).emit("newMessage", messageToSend);
        }

        res.status(201).json(newMessage);
    } catch (error: any) {
        console.error("Error in sendMessage controller:", error);
        next(error);
    }
};

export const getMessages = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id: userTOChatID } = req.params;
        const senderId = req.user.id;
        

        const conversation = await prisma.conversation.findFirst({
            where: { participantIds: { hasEvery: [senderId, userTOChatID] } },
            include: { messages: { orderBy: { createdAt: "asc" } } },
        }); // find the conversation

        if (!conversation) {
            return res.status(200).json([]);
        }

        res.status(200).json(conversation.messages);

    } catch (error: any) {
        console.error("error in getMessages controller", error.message);
        next(error);
    }
};

export const getUsersForSidebar = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authUserId = req.user.id;

        const users = await prisma.user.findMany({
            where: {
                id: {
                    not: authUserId
                }
            },
            select: {
                id: true,
                fullName: true,
                profileImage: true,
            }
        });

        res.status(200).json(users);
    } catch (error: any) {
        console.log("error in getConversations controller", error);
        next(error);
    }
}
