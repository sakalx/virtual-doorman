const session = require('express-session');
const FileStore = require('session-file-store')(session);

const config = require('../../config');

const sessionStore = new FileStore(config.fileStoreConfig);

const sessionMiddleware = session({
  ...config.session,
  store: sessionStore,
});

module.exports = {
  sessionMiddleware,
  sessionStore,
};