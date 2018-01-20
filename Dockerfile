# Use Alpine Base image 
FROM node:5.5.0

# create the log directory
RUN mkdir -p /var/log/applications/statistics-service

# Creating base "src" directory where the source repo will reside in our container.
# Code is copied from the host machine to this "src" folder in the container as a last step.
RUN mkdir /src
WORKDIR /src

# Copy package.json into the container and install node modules
COPY ./package.json /src

# Install node dependencies
RUN npm install

# Copy entire file to docker
COPY . /src

# Expose web service and nodejs debug port
EXPOSE  8080 8585 9615

CMD ["node", "server.js"]