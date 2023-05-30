# Use a smaller base image
FROM node:18-alpine AS build

# Set a default branch value
ARG BRANCH=main
RUN echo "BRANCH ${BRANCH}"


# Set the working directory
WORKDIR /usr/app

# Copy the application code
COPY . /usr/app

# Install dependencies and build the application
RUN npm install && npm run build:${BRANCH}

# Copy the build
COPY . /usr/app/build


# Install server
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Start serve as the default command
ENTRYPOINT [ "serve", "-l", "3000", "-s", "build" ]