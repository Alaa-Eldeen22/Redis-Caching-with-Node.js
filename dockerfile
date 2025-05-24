FROM node:18-bullseye-slim
WORKDIR /app

# Copy package files FIRST for layer caching
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy ALL files (including .env)
COPY . .

CMD ["node", "app.js"]