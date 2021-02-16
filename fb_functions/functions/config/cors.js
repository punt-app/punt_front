const functions = require("firebase-functions");

const corsOptions = {
  origin: functions.config().project_config.front_url,
  credentials: true
}

module.exports = corsOptions