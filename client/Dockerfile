# Stage 1: Build the application
FROM node:21-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the application
FROM node:21-slim

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 2500

CMD ["npm", "start"]
