module.exports = app => {
  const Project = app.models.Project;
    return {
      read,
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

    function read(req, res, next) {
      return Project.findAll().then(projects => {
        return res.success(projects);
      })
    }

    function create(req, res, next) {
      return Project.create({
        label: req.body.label,
        description: req.body.description,
        start: req.body.start,
        end: req.body.end
      }).then(app.helpers.ensureOne)
        .catch(error => {
          return app.helpers.reject(400, "Project", "ErrorWhileCreationProject", error)
        })
        .then(project => {
          res.json(project)
        })
        .catch(error => {
          res.error(error)
        })
    }

    function update(req, res, next) {
      return Project.findByPk(req.params.id)
        .then(app.helpers.ensureOne)
        .catch(error => {return app.helpers.reject(404, "Project", "ErrorProjectNotFound", error)})
        .then(project => {
          return project.update({
            label: req.body.label,
            description: req.body.description,
            start: req.body.start,
            end: req.body.end})
        })
        .then(project =>{
          res.json(project)
        })
        .catch(error => {
          res.error(error)
        })
    }
  };
