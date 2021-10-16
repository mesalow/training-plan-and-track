# syntax=docker/dockerfile:1
FROM node-alpine:latest
WORKDIR /app
RUN apk add --no-cache bash
COPY package.json yarn.lock ./
RUN yarn global add @vue/cli
COPY . ./
RUN yarn build
CMD ["yarn", "start"]