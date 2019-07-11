const Router = require('express').Router;

module.exports = (app) => {
  let router = new Router();

  router.post('/',
  app.middlewares.ensureAuthenticated("Admin", app),
  app.actions.user.create);
  router.put('/:id',
  app.middlewares.ensureAuthenticated("Admin", app),
  app.actions.user.update);

  return router
};
