This API handles all four basic CRUD operations for image/png files

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

Basic setup and usage:

To get the docker image from docker hub, open a terminal and run the following,
    docker pull terrinss951/catpicapi-prod:latest

To run the container,
    docker run -p 3000:3000 terrinss951/catpicapi-prod

You can now make HTTP requests to the api's endpoints at
    http://localhost:3000/


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

To get the name of the running container instance,
Open another terminal and run
    docker ps

To stop the running container,
    docker stop [container-name]


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

To run the suite of tests provided,
Open another terminal and run
    docker exec [container-name] npm run test


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

What to expect:

POST requests to localhost:3000/catPics/:id, with a png img file in the req.body,
will upload the image to the datastore folder inside the project directory, and
return a confirmation message

GET requests to localhost:3000/catPics will return a list of the ID's of all
images stored in the datastore folder

GET requests to localhost:3000/catPics/:id will return from the datastore
the image with the given ID

PATCH requests to localhost:3000/catPics/:id, with a png img file in the req.body,
will replace the image file with the given ID in the datastore with the new image
file provided in the request, and return a confirmation message

DELETE requests to localhost:3000/catPics, with req.body containing the key-value
pair of "id" and a string value equal to the ID of an image in the datastore,
will remove the corresponding file from the datastore and return a confirmation
message
