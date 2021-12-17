FROM node:16.13-alpine

WORKDIR /home/node/app
COPY ./package*.json ./

RUN npm install

RUN npm i typescript -g

COPY . .

EXPOSE ${PORT}
CMD ["npm", "start"]