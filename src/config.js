const merge = require('lodash/merge');

window.DEBUG = process.env.NODE_ENV !== 'production';
const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
  },
  development: {
    apiUrl: 'http://192.168.1.21:8080'//'http://192.168.1.105:8080', 
  },
  production: {
    apiUrl:  window.location.origin
  },
};

module.exports = merge(config.all, config[config.all.env]);
