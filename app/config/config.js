'use strict';

const appName = 'statisticsservice';
const config = {
    appName: appName,
    webserver: {
        port: process.env.PORT || '8080'
    },
    application_logging: {
        file: process.env.LOG_PATH,
        level: process.env.LOG_LEVEL || 'info',
        console: process.env.LOG_ENABLE_CONSOLE || true
    }
};

module.exports = config;
