const merge = require('lodash/merge');

window.DEBUG = process.env.NODE_ENV !== 'production';
const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
  },
  development: {
    apiUrl: 'http://39.98.181.11:9080'//'http://192.168.1.105:8080', 
  },
  production: {
    apiUrl: 'http://' + window.location.href.split("://")[1].split('/')[0]
  },
};

module.exports = merge(config.all, config[config.all.env]);
