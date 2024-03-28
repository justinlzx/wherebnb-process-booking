FROM node:lts-alpine AS build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
# RUN npm run build

# FROM node:lts-alpine AS release
# WORKDIR /app
# COPY package* ./
# RUN npm install --production
# COPY --from=build ./app/public ./public
# COPY --from=build ./app/dist ./dist

EXPOSE 3004
CMD ["node", "src/index.js"]
