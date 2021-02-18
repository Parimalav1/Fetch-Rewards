const db = require("../data/connection.js");

module.exports = {
  // find,
  getBalances
}

// function find() {
//   return db('transactions').select('payerId', 'points').orderBy('payerId');
// };

function getBalances() {
  return db('transactions as t')
    .join('payers as p', 'p.id', 't.payerId')
    .select('p.name', 't.points')
}





