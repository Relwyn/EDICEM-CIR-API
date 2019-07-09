module.exports = app => {
    const User = app.models.User;
    return {
      create
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
            email: req.body.email,
            password: req.body.password,
        }).then(app.helpers.ensureOne)
        .catch(error => {
            return app.helpers.reject(400, "badRequest", "ErrorWhileCreatingUser", error)
        })
        .then(user => {
            res.json(user)
        })
        .catch(error => {
            res.error(error)
        })
    }
  };
  