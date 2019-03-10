// SQL dummy db users
const usersSQLdb = [
  {
    id: 'some uid',
    name: 'sakal',
    password: 'secret',
  },
];

// Variables :
const usersStorage = {
  'some uid': {
    id: 'some uid',
    name: 'some name',
    token: 'secret token',
    status: 'offline',
  },
};


function verifyToken(clientToken, callback) {
  const verifiedUser = Object.values(usersStorage).find(({token}) => token === clientToken);

  return verifiedUser
    ? callback(null, verifiedUser)
    : callback(new Error('Token not found, re-login'));
}


function verifyNameAndPassword(userName, password, callback) {
  const user = usersSQLdb.find(userDB => userDB.name === userName);

  if (!user) return callback(new Error('User not found'));

  if (user.password !== password) return callback(new Error('Incorrect password'));

  const verifiedUser = {
    id: user.id,
    name: user.name,
    token: 'create secret token',
    status: 'online',
  };
  usersStorage[user.id] = verifiedUser;

  return callback(null, verifiedUser);
}


function authenticate(socketClient, {userName, password, clientToken}, callback) {

  return clientToken
    ? verifyToken(clientToken, callback)
    : verifyNameAndPassword(userName, password, callback);
}

module.exports = authenticate;