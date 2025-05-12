# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy files
COPY package*.json ./
RUN npm install
RUN npm install -g @nestjs/cli
COPY . .

# Build TypeScript
RUN npm run build

# Expose port and start
EXPOSE 3001
CMD ["node", "dist/main.js"]
