const Router = require('express').Router;

module.exports = (app) => {
  let router = new Router();

  router.get('/',
  app.actions.project.read);
  router.post('/',
  app.actions.project.create);
  router.put('/:id',
  app.actions.project.update);

  return router
};
