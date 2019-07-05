const Sequelize = require('sequelize');
module.exports = app => {
  app.sequelize = new Sequelize(
    app.config.database.name,
    app.config.database.user,
    app.config.database.password, {
      host: app.config.database.host,
      dialect: 'mysql',
      logging: app.config.database.option.loggin,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    });

  app.models = {
    // Project
    Historic: require('./Project/Historic')(app, Sequelize),
    Project: require('./Project/Project')(app, Sequelize),
    Task: require('./Project/Task')(app, Sequelize),
    // User
    Log: require('./User/Log')(app, Sequelize),
    Reset: require('./User/Reset')(app, Sequelize),
    Role: require('./User/Role')(app, Sequelize),
    User: require('./User/User')(app, Sequelize),
  };

  app.sequelize.authenticate()
    .then(async () => {
      app.logger.info('Connection has been established successfully');

      // Associations


      // User management --------------------------------------------------------------------------------------------

      // ------- BelongTo
      // Link User to Role
      app.models.User.belongsTo(app.models.Role, {as: 'Role', foreignKey: 'role_id'});
      app.models.User.belongsTo(app.models.Reset, {as: 'Reset', foreignKey: 'reset_id'});

      // ------- HasMany
      app.models.User.hasMany(app.models.Log, {as: 'Log', foreignKey: 'user_id'});

      // Project management -----------------------------------------------------------------------------------------
      app.models.Task.belongsTo(app.models.Project, {as: 'Project', foreignKey: 'project_id'});

      // ------- HasMany
      // Link Project to Task
      app.models.Project.hasMany(app.models.Task, {as: 'Task', foreignKey: 'project_id'});

      // ------- BelongsToMany
      // Link User to Project
      app.models.User.belongsToMany(app.models.Project, {
        as: 'Project',
        through: 'User_Project',
        foreignKey: 'user_id'
      });
      app.models.Project.belongsToMany(app.models.User, {
        as: 'User',
        through: 'User_Project',
        foreignKey: 'project_id'});
      
      // Link User to Historic
      app.models.User.belongsToMany(app.models.Historic, {
        as: 'Historic',
        through: 'User_Historic',
        foreignKey: 'user_id'
      });
      app.models.Historic.belongsToMany(app.models.User, {
        as: 'User',
        through: 'User_Historic',
        foreignKey: 'historic_id'
      });

    }).then(
    app.sequelize.sync({force: app.config.database.option.force})
      .then(async () => {
        //Default data
      })
      .catch(error => {
        app.logger.error("Cannot connect to the database", error)
      })
  )
};
