FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install -g @nestjs/cli
COPY . .

RUN npm run build

EXPOSE 3002
CMD ["node", "dist/main.js"]
