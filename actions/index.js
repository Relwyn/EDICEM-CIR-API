module.exports = app => {
  app.actions = {
    app: require('./app')(app), // Load your action
    auth: require('./auth')(app),
    project: require('./project')(app),
    user: require('./user')(app),
  };
};