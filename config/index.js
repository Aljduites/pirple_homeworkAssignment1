1/**
 * 
 * Configuration variables
 * 
 */

 // Environment container

const environments = {
    //Staging environment
    staging: {
        'httpPort': 4000,
        'httpsPort': 4001,
        'envName': 'staging'
    },

    //production environment
    production: {
        'httpPort': 3000,
        'httpsPort': 3001,
        'envName': 'production'
    }
};

// Determine which environment was passed
const currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check current environment
const environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

module.exports = environmentToExport;