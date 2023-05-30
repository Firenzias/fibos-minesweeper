# Use a smaller base image
FROM node:18-alpine AS builder

# Set a default branch value
ARG BRANCH=main
RUN echo "BRANCH ${BRANCH}"

# Set the working directory
WORKDIR /usr/app

# Copy our node module specification
COPY package*.json ./

# Install dependencies and build the application
RUN npm install

# Copy all files from current directory to working dir in image
# Except the one defined in '.dockerignore'
COPY . .
RUN npm run build:${BRANCH}

# Use a smaller base image
FROM nginx:stable-alpine

# Copy the Nginx configuration file
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

# Remove the default Nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy the application build output
COPY --from=builder /usr/app/build /usr/share/nginx/html

# Expose port
EXPOSE 3000

# Start Nginx as the default command
CMD ["nginx", "-g", "daemon off;"]