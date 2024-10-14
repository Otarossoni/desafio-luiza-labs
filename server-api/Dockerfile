FROM node:20-alpine

WORKDIR /usr/src/api

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3140

CMD ["npm", "run", "start:docker"]
