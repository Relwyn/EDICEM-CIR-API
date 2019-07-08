const express = require('express');

// Initialise the main express application server
const app = express();


// Loading applicatin stack
require("./config/index.js")(app);console.log("Loading config");
require("./boot/index.js")(app); app.logger.info("Loading Boot");
require("./models/index.js")(app);app.logger.info("Loading models");
require("./helpers/index.js")(app);app.logger.info("Loading helpers");
require("./middlewares/index.js")(app);app.logger.info("Loading middlewares");
require("./actions/index.js")(app);app.logger.info("Loading actions");
require("./routes/index.js")(app);app.logger.info("Loading routes");

app.logger.info(`App listening on http://localhost:${app.config.port}`);
app.listen(app.config.port);
