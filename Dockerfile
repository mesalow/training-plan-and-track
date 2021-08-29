# syntax=docker/dockerfile:1
FROM node:16-alpine
RUN apk add --no-cache python3 g++ make sqlite
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "build/index.js"]