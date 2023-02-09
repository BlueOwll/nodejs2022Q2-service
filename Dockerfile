FROM node:18-alpine

WORKDIR /usr/src/rest-service

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE $PORT

CMD [ "node", "dist/main" ]