# syntax=docker/dockerfile:1
FROM node:16-alpine
WORKDIR /app
RUN apk add --no-cache bash python3 g++ make sqlite inotify-tools
RUN npm install -g nodemon
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn run build 
CMD ["yarn", "start"]