FROM node:lts-alpine AS build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .

EXPOSE 3004
CMD ["node", "src/index.js"]
