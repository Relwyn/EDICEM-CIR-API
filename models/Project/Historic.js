module.exports = (app, Sequelize) => {
    const Historic = {
      type: {
        type: Sequelize.STRING(45),
        AllowNull: false,
      },
      user_modified: {
        type: Sequelize.INTEGER(),
        AllowNull: false,
      },
      date: {
        type: Sequelize.DATE(),
        AllowNull: false,
      }
    };
    return app.sequelize.define('Historic', Historic, {
      ...app.config.database.model
    });
  };
  