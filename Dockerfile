# Use Node.js 20 as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json for installing dependencies
COPY package*.json ./

# Update npm to version 10.9
RUN npm install -g npm@10.9.0

# Install project dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Set the command to start the application
CMD ["npm", "run", "dev"]
