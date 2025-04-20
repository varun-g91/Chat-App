FROM node:20-slim AS base
WORKDIR /app

FROM base AS dependencies
COPY package.json yarn.lock* ./
RUN yarn install --production --frozen-lockfile

FROM base as builder 
WORKDIR /app

RUN apt-get update && apt-get install -y openssl --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*
COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile
COPY prisma ./prisma
RUN cd prisma && npx prisma generate
COPY . .
RUN yarn build

FROM base as production
WORKDIR /app

RUN apt-get update && apt-get install -y openssl --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
RUN cd prisma && npx prisma generate
ENV DATABASE_URL=postgresql://chat-db_owner:4UOMW9KdSiRn@ep-damp-dust-a1cqx6dy.ap-southeast-1.aws.neon.tech/chat-db?sslmode=require
ENV JWT_SECRET=f465f28ef473ab275a344fc94a10e6fd122dfcbb45b55064b2c1cd5d0f44743b13601b7bf2c02cc655af535b0761e3f02669c1811d2e7dc972492e11e9acd8dd 
ENV NODE_ENV=production
COPY package.json .



EXPOSE 5000

CMD [ "yarn", "start" ]
