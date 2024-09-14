# Use an official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Set environment variables
ENV PORT=8000
ENV DATABASE_ATLAS=mongodb+srv://mulersoft:Linger1221@muziccluster.vtmuf.mongodb.net/messageHub
ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 8000

# Command to run the app
CMD ["node", "dist/server.js"]
