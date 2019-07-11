module.exports = (roles, app) => {
	const jwt = require('jsonwebtoken');
	const Role = app.models.Role;
	const User = app.models.User;
	roles = (roles instanceof Array) ? roles : [roles];

  return (req, res, next) => {
		try{
			decoded = jwt.verify(req.header('Authorization'), app.config.jwt.salt, function(err, decoded) {
				if (err) {
					return app.helpers.reject(400, "Jwt", "TokenError", err);
				}
				return decoded;
			});
			return User.findByPk(decoded.data.userId)
			.then(app.helpers.ensureOne)
      .catch(error => {
        return app.helpers.reject(404, "User", "ErrorUserNotFound", error)
      })
			.then(async user => {
				let userRole = await user.getRole();
				for(let role of roles){
					if (userRole.label === role) {
						return user;
					}
				};
				return app.helpers.reject(400, "User", "ErrorRoleNotFound", "");
				})
				.then(user => {
					req.user = user;
					next()
				})
				.catch(error => {
					res.error(error);
				});
		}catch(error){
			res.error(error);
		}
   }
	};
