const config = {
  port: 8000,
  // File store
  fileStoreConfig: {
    path: './modules/session-module/tmp/sessions',
    ttl: 86400000
  },
  // SQL db
  sql: {
    connection: {
      host: 'localhost',
      user: 'root',
      password: '2015My0234$',
      database: 'vdmdb',
    },
  },
  // Session
  session: {
    secret: 'Kitty',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      path: '/',
      httpOnly: true,
      maxAge: 86400000,
    },
  },
};

module.exports = config;