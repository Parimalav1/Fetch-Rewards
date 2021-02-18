const db = require("../data/connection.js");

module.exports = {
  addDeal,
  findById
}

// function findById(id) {
//   // console.log('findById', id);
//   return db('payers').where({
//     id
//   }).select('id', 'name').first();
// };

function addDeal(points) {
  return db('transactions').insert(points, "id")
    .join('payers as p', 'p.id', 't.payerId')
    .select('p.name', 't.points', 't.timeStamp')
};
