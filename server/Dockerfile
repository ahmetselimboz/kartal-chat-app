FROM node:21-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 2400

CMD ["npm", "start"]
