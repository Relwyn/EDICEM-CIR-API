module.exports = app => {
  app.use('/', require('./app')(app));
  app.use('/auth', require('./auth')(app));
  app.use('/project', require('./project')(app));
  app.use('/user', require('./user')(app));
};