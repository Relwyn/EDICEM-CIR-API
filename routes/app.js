const Router = require('express').Router;

module.exports = (app) => {
  let router = new Router();

  router.get('/', 
  app.middlewares.ensureAuthenticated("Admin", app),
  app.actions.app.read);

  return router
};