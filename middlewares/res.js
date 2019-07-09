module.exports = (req, res, next) => {
  res.success = (data) => {
    if (!data) {
      return res.status(204).send()
    }
    return res.json(data);
  };

  res.error = (error) => {
    if (!error.code) {
      return res.status(500).send({ name: "error", message: error.toString() });
    }
    return res.status(error.code).send({ name: error.name, message: error.message, error: error.error || "" });
  };

  next();
};