FROM node:20-alpine

RUN apk add --no-cache python3 make g++ sqlite-dev

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
