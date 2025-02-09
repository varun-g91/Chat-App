FROM node:20

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

WORKDIR /app/backend/prisma 

RUN npx prisma generate

WORKDIR /app

EXPOSE 5000

CMD ["yarn", "dev"]
