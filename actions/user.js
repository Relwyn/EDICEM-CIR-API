module.exports = app => {
	const bcrypt = require('bcrypt');
  const User = app.models.User;
  return {
		create,
		read,
    update
  };

  /**
   * [Some action]
   * @param  {object}   req  Expresss request
   * @param  {object}   res  Expresss response
   * @param  {Function} next Next middleware
   * @return {Promise}       returned Promise
   */

	function read(req, res, next) {
		let offset = (req.query.page - 1) * req.query.limit;
		return User.findAndCountAll({
			limit: Number(req.query.limit),
			offset: offset,
			order: [
				['updatedAt', 'DESC'],
			],
		})
		.catch(error => {
			return app.helpers.reject(404, "User", "ErrorUserNotFound", error)
		})
		.then(result => {
			res.json(result);
		})
		.catch(error => {
			res.error(error)
		});
	}

  function create(req, res, next) {
		return bcrypt.hash(req.body.password,10)
		.then(password => {
			return User.create({
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				phone_id: req.body.phone_id,
				phone_number: req.body.phone_number,
				role_id : req.body.role_id || 1,
				email: req.body.email,
				password: password,
			})
		})
    .then(app.helpers.ensureOne)
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
