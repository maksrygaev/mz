# Specify a base image
FROM node:alpine

WORKDIR '/app'

# Copy all the source code & dependencies
COPY . .

# Uses port which is used by the actual application
EXPOSE 3000

# Default command
CMD yarn start