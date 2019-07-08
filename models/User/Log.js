module.exports = (app, Sequelize) => {
    const Log = {
      type: {
        type: Sequelize.STRING(45),
        AllowNull: false,
      },
      user_update: {
        type: Sequelize.STRING(45),
        AllowNull: false,
      },
      request: {
        type: Sequelize.TEXT(),
        AllowNull: false, 
      },
      date: {
        type: Sequelize.DATE(),
        AllowNull: false,
      }
    };
    return app.sequelize.define('Log', Log, {
      ...app.config.database.model
    });
  };
  