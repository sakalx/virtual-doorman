const mysql = require('mysql');
const config = require('../../config');

// Creat SQL connection
const db = mysql.createConnection(config.sql.connection);

// Check connection
db.connect(function (error) {
  if (error) throw error;
  console.log('Connected to SQL db');
});

// List of SQL tables :
const table = {
  notifications: 'notification',
};


// [INSERT] to table :
function getSqlInsertToTable(table) {
  return `INSERT INTO ${table} SET ?`;
}

function insertToTable({table, payload}) {
  const sql = getSqlInsertToTable(table);

  db.query(sql, payload, function (error) {
    if (error) throw error;
    console.warn('New data going to table: ', table);
  });
}


// [UPDATE] date in table by id :
function getSqlUpdateTable(table, payload) {
  // payload = {foo: 1, bar: 3}
  const sqlColumns = Object.keys(payload).reduce((acc, next) =>
    acc + `${next} = ?, `, '').slice(0, -2); //foo = ?, bar = ?

  const sql = `UPDATE ${table} SET ${sqlColumns} WHERE id = ?`;
  const values = Object.values(payload); // [1, 3]
  return [sql, values];
}

function updateTableById({table, uid, payload}) {
  const [sql, values] = getSqlUpdateTable(table, payload);
  values.push(uid);

  db.query(sql, values, function (error) {
    if (error) throw error;
    console.warn('Updating going to table: ', table);
  });
}


// [SELECT] all data from table :
function getSqlSelectAllFromTable(table) {
  return `SELECT * FROM ${table}`;
}

function getDataFromTable({table, callBackResult, callBackEnd}) {
  const sql = getSqlSelectAllFromTable(table);

  db.query(sql)
    .on('result', callBackResult)
    .on('end', callBackEnd);
}


module.exports = {
  table,
  insertToTable,
  updateTableById,
  getDataFromTable,
};