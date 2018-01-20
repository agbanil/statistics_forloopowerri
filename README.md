# Simple Nodejs App For Calculating Transaction Statistics

This repository contains the code for the Statistics Service;

## Instructions

### Docker

#### Building Images

This project has been setup to use docker to create a development environment. The readme assumes docker version >= 1.9.1 installed on your system.

Simply run:

```
docker build -t statisticsapp .
```

The command will attempt to build an image for the web app based on the image specified in the Dockerfile. If the project's image cannot be found, it will be built from the Dockerfile automatically.

When all the image build is complete, simply run:

```
docker run --env-file .env -p 32801:8080 statisticsapp  
```

At this point a container will be created from the app's image that was built in the previous step with environment variables taken from the ones specified in the above command and the API will be accessible with base url:

    http://localhost:32801/v1


Thus your adventure begins... 

#### Stopping Containers

simple do ```docker ps``` to view containers created and then copy the container id (usually something like this ==> ```26adeaa0bce1```), then run: 
```
docker stop <container_id>
```
to stop the container explicitly.

### Endpoints
Base URL : `http://localhost:32801/v1`

| Name   | Method      | URL                  |
| ---    | ---         | ---                  |
| GET stats   | `GET`       | `/statistics`           |
| Add transactions   | `POST`      | `/transactions`           |

## Technologies used
### Node.js
This project was built using nodejs with restify. The use case needed a lightweight non-blocking endpoint, and looking at how quickly I could bootstrap, I decided to go with nodejs. Bear in mind that this could have also been seemless with GOland, Java, PHP, etc.

### Restify
I could have used bare node but decided to go with restify here because of its load management and concurrency. Restify also keeps connections alive which removes the overhead of creating a connection each time when getting called from the same client.

### Docker
I know it's an overkill at some point but I wanted something that can be run without pain and isn't dependent on what version of what is installed on the local machine. There would have been no need to finish this if it cannot be run.

## Project Structure
.   
├── app       
├── bin                                        
├── tests       
└── README.md