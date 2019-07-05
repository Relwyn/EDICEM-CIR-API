module.exports = (app, Sequelize) => {
    const Reset = {
      token: {
        type: Sequelize.STRING(45),
        AllowNull: false,
      },
      date: {
        type: Sequelize.DATE(),
        AllowNull: false,
      }
    };
    return app.sequelize.define('Reset', Reset, {
      ...app.config.database.model
    });
  };
  