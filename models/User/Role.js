module.exports = (app, Sequelize) => {
  const Role = {
    label: {
      type: Sequelize.STRING(45),
      AllowNull: false,
    },
  };
  return app.sequelize.define('Role', Role, {
    ...app.config.database.model
  });

};
