module.exports = app => {
  const Project = app.models.Project;
    return {
      read,
      create
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
      }).then(project => {
        return res.success({});
      })
    }
  };
