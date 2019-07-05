module.exports = (app, Sequelize) => {
  const User = {
    first_name: {
      type: Sequelize.STRING(45),
      AllowNull: false,
    },
    last_name: {
      type: Sequelize.STRING(45),
      AllowNull: false,
    },
    phone_id: {
      type: Sequelize.STRING(45),
      AllowNull: false,
    },
    phone_number: {
      type: Sequelize.STRING(10),
      AllowNull: false,
    },
    email: {
      type: Sequelize.STRING(150),
      AllowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING(45),
      AllowNull: false
    },
  };
  return app.sequelize.define('User', User, {
    ...app.config.database.model
  });

};
