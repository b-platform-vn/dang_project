FROM node:18-alpine

WORKDIR /app

# Configure npm
ENV NPM_CONFIG_LOGLEVEL=info
ENV NPM_CONFIG_FETCH_TIMEOUT=300000
ENV NPM_CONFIG_FETCH_RETRIES=3

# Copy package files
COPY package*.json ./

# Install dependencies with increased timeout
RUN npm install --verbose --legacy-peer-deps || npm install --legacy-peer-deps

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:dev"]
