FROM node:20-slim AS base
WORKDIR /app

FROM base AS dependencies
COPY package.json yarn.lock* ./
RUN yarn install --production --frozen-lockfile

FROM base as builder
WORKDIR /app

COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM base as production
WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
ENV VITE_API_URI=https://chat-app-3kbk.onrender.com
RUN yarn add vite
COPY package.json .

EXPOSE 4173

CMD [ "yarn", "start" ]

