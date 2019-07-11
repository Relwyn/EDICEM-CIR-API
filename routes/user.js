const Router = require('express').Router;

module.exports = (app) => {
  let router = new Router();

  router.get('/',
  app.middlewares.ensureAuthenticated(["Admin", "Director", "Compta", "Collaborator"], app),
  app.actions.user.read);
  router.post('/',
  app.middlewares.ensureAuthenticated("Admin", app),
  app.actions.user.create);
  router.put('/:id',
  app.middlewares.ensureAuthenticated("Admin", app),
  app.actions.user.update);

  return router
};
