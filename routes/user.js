const Router = require('express').Router;

module.exports = (app) => {
  let router = new Router();

  router.post('/',
  app.actions.user.create);

  return router
};