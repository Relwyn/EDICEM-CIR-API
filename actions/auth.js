module.exports = app => {
	const jwt = require('jsonwebtoken');
	const bcrypt = require('bcrypt');
	const User = app.models.User;
  return {
    login
  };
  
    /**
     * [Some action]
     * @param  {object}   req  Expresss request
     * @param  {object}   res  Expresss response
     * @param  {Function} next Next middleware
     * @return {Promise}       returned Promise
     */
  
    function login(req, res, next) {
			User.findOne({
				where: {
					email: req.body.email
				}
			}).then(app.helpers.ensureOne)
				.catch(error => {
					return app.helpers.reject(404, "User", "ErrorUserNotFound", error);
				})
				.then(async user => {
					const samePassword = await bcrypt.compareSync(req.body.password, user.password,function(err,isMatch){
						if(err) return app.helpers.reject(400, "User", "IncorrectCredentials", err)
						return isMatch;
					});
					console.log("same : " + samePassword);
					if (samePassword){
						return user;
					}
					return app.helpers.reject(400, "User", "IncorrectCredentials", "");
				})
				.then(user => {
					return jwt.sign({
						data: {userId: user.id}
					}, app.config.jwt.salt, { expiresIn: app.config.jwt.sessionLength });

				}).then( Authorization => {
					res.success({Authorization});
				})
				.catch(error => {
					res.error(error)
				})
    }
  };