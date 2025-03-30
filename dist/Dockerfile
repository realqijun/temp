# Use an official Node runtime as the parent image
FROM node:18.20.2-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN apk add --no-cache \
  yarn

# Install any needed packages specified in package.json
RUN yarn

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run app.js when the container launches
CMD ["node", "index.js"]
