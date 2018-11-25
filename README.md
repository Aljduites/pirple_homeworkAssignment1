# pirple_homeworkAssignment1

My first Homework assignment for Pirple's NodeJS Master class

## Download / Installation

- Clone the repository
- Create a https directory in the root directory
- Change the current directory in the new created https directory (cd https)
- In the https directory run the following command to create the key.pem and cert.pem files: openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem

## How to use it
- To start the Server run "node index.js" in the terminal. (Don't include the double qoutes)
- The server will be listening on port 4000 for http and 4001 for https in staging environment.
- To run the server in production mode run NODE_ENV=production node index.js (In windows, if it doesn't work try, $env:NODE_ENV="production"; node index.js)
- The server will be listening on port 3000 for http and 3001 for https in production environment.
- To run the server in staging mode run NODE_ENV=staging node index.js (Again, if it doesn't work in windows try, $env:NODE_ENV="staging"; node index.js)

## Routes
#Endpoint | #StatusCode | #Description
--- |--- |---
/ping | 200 | Test if application is working
/hello | 200 | Route will return a Hello world message in JSON format
(error) | 404 | Route will return an empty JSON
