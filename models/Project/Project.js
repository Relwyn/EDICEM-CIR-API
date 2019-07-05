module.exports = (app, Sequelize) => {
    const Project = {
      label: {
        type: Sequelize.STRING(45),
        AllowNull: false,
      },
      description: {
        type: Sequelize.STRING(255),
        AllowNull: false,
      },
      start: {
        type: Sequelize.DATE(),
        AllowNull: false,
      },
      end: {
        type: Sequelize.DATE(),
        AllowNull: false,
      },
    };
    return app.sequelize.define('Project', Project, {
      ...app.config.database.model
    });
  };
  