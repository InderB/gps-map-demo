'use strict'
var services = require('./serviceBackend');

function useAngular(req, res, next) {
  res.sendFile(require('path').join(__dirname, './client/index.html'))
}

exports = module.exports = function (app) {
  // public
  app.get('/', useAngular)
  app.get('/gpsDemo/getSpeed/:data', services.getSpeed)
  app.get('/gpsDemo/getSpeedOnOriginalPoints/:data', services.getSpeedOnOriginalPoints)
  // other routes not found nor begin with /api is handled by Angular
  app.all(/^(?!\/api).*$/, useAngular)
};
