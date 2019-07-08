const bodyParser = require('body-parser')
const Router = require('express').Router;

module.exports = (app) => {
  let router = new Router();

  router.get('/',
  bodyParser.json, 
  app.actions.project.read);
  router.post('/create', 
  
  app.actions.project.create);

  return router
};