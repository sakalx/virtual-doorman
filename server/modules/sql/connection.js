module.exports = function (mysql) {

  // Creat SQL connection
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2015My0234$',
    database: 'vdmdb'
  });

  // Check connection
  db.connect(function (error) {
    if (error) throw error;
    console.log('Connected to SQL db');
  });

  return db
};