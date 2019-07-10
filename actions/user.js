module.exports = app => {
  const User = app.models.User;
  return {
    create,
    update
  };

  /**
   * [Some action]
   * @param  {object}   req  Expresss request
   * @param  {object}   res  Expresss response
   * @param  {Function} next Next middleware
   * @return {Promise}       returned Promise
   */

  function create(req, res, next) {
    return User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone_id: req.body.phone_id,
      phone_number: req.body.phone_number,
      role_id : req.body.role_id || 1,
      email: req.body.email,
      password: req.body.password,
    }).then(app.helpers.ensureOne)
      .catch(error => {
        return app.helpers.reject(400, "User", "ErrorWhileCreatingUser", error)
      })
      .then(user => {
        res.json(user)
      })
      .catch(error => {
        res.error(error)
      })
  }

  function update(req, res, next) {
    return User.findByPk(req.params.id)
      .then(app.helpers.ensureOne)
      .catch(error => {return app.helpers.reject(404, "User", "ErrorUserNotFound", error)})
      .then(user => {
        return user.update({
          first_name: req.body.first_name || user.first_name,
          last_name: req.body.last_name || user.last_name,
          phone_id: req.body.phone_id || user.phone_id,
          phone_number: req.body.phone_number || user.phone_number,
          email: req.body.email || user.email,
          role_id: req.body.role_id})
      })
      .then( user => {
        res.json(user)
      })
      .catch(error => {
        res.error(error)
      })
  }
};
