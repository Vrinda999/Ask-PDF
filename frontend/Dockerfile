# Use an official Node.js image as the base image
FROM node:18-bullseye

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port used by the React development server
EXPOSE 5173

# Start the React development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]