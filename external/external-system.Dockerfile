################### Start of main image building
FROM node:12-alpine

# Create app directory
WORKDIR /app

# Copy all the required file for transpiling to js
# COPY application/package*.json ./

RUN npm install

# Install node dependencies - done in a separate step so Docker can cache it
COPY . /app

RUN npm install

EXPOSE 8000

CMD ["node", "server.js"]
