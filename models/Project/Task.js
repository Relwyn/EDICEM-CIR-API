module.exports = (app, Sequelize) => {
    const Task = {
      label: {
        type: Sequelize.STRING(45),
        AllowNull: false,
      },
      description: {
        type: Sequelize.STRING(255),
        AllowNull: false,
      },
      goal: {
        type: Sequelize.INTEGER(),
        AllowNull: false,
      },
      time_used: {
        type: Sequelize.INTEGER(),
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
    return app.sequelize.define('Task', Task, {
      ...app.config.database.model
    });
  };
  