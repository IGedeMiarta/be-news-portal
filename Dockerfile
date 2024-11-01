# Use Node.js 20 as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json for installing dependencies
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

#Copy .env file
RUN cp .env.example .env

# Expose the port your app runs on
EXPOSE 8000

# Set the command to start the application
CMD ["npm", "run", "dev"]

# Run the migrations
# RUN npx sequelize-cli db:migrate