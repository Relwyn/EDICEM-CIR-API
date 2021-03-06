module.exports = app => {
  app.helpers = {
    ensureOne,
    reject,
  };

  function ensureOne(data) {
    return (data) ? data : Promise.reject();
  }

  function reject(code, name, message, error) {
      return Promise.reject({
        code: code,
        name: name,
        message: message,
        error: error
      });
    };
};