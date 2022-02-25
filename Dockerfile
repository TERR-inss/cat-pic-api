# start from a base layer of node v16.14
FROM node:16.14

# set up a work directory for application in the container
WORKDIR /usr/cat-pic-api

# copy all application files to the workdir in the container
COPY . /usr/cat-pic-api

# npm install to create node_modules in the container
RUN npm install

# EXPOSE your server port
EXPOSE 3000

# run the server
ENTRYPOINT ["node"]
CMD ["./server.js"]