/**
 * 
 * Primary File for API
 * 
 */

//Dependencies
const config = require('./config/index');
const { httpServer, httpsServer } = require('./config/server');

//Starting HTTP Server
httpServer.listen(config.httpPort, () => {
    console.log(`The server is listening on port ${config.httpPort} in ${config.envName} environment`);
});

httpsServer.listen(config.httpsPort, () => {
    console.log(`The server is listening on port ${config.httpsPort} in ${config.envName} environment`);
});
