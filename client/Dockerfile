# syntax=docker/dockerfile:1
FROM node:16-alpine
WORKDIR /app
RUN apk add --no-cache bash
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn run build
CMD ["yarn", "watchbuild"]