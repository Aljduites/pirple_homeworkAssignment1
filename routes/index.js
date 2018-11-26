/**
 * 
 * Routes and Handlers
 * 
 */

// Handlers
const handlers = {
    //ping route
    ping: (data, callback) => { callback(200); },

    //hello route
    hello: (data, callback) => { callback(200, { "Message" : "Hello World" }); },

    //notFound route
    notFound: (data, callback) => { callback(404); }
};

const router = {
    'hello': handlers.hello,
    'notFound': handlers.notFound,
    'ping': handlers.ping
}

module.exports = {
    handlers,
    router
};