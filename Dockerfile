FROM node:16
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN apt update -y && apt install vim -y && npm install

COPY . .

EXPOSE 3064

CMD [ "node", "server.js" ]