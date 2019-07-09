module.exports = app => {
  app.actions = {
    app: require('./app')(app), // Load your action
    project: require('./project')(app),
    user: require('./user')(app),
  };
};