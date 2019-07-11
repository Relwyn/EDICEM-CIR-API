const Router = require('express').Router;

module.exports = (app) => {
  let router = new Router();

  router.get('/',
  app.middlewares.ensureAuthenticated(["Admin", "Director", "Compta", "Collaborator"], app),
  app.actions.project.read);
  router.post('/',
  app.middlewares.ensureAuthenticated(["Admin", "Director"], app),
  app.actions.project.create);
  router.put('/:id',
  app.middlewares.ensureAuthenticated(["Admin", "Director"], app),
  app.actions.project.update);

  return router
};
