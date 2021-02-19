const db = require("../data/connection.js");

module.exports = {
  addDeal,
}

function getPayerId(payerName) {
  return db('payers').select("id").where({'name': payerName})
    .then((ids) => {
      if (ids.length == 0) {
        return db('payers').insert({'name': payerName}, "id").then(([id]) => {
          return id;
        });
      } else {
        return ids[0].id;
      }
    })
}

function addDeal(deal) {
  return getPayerId(deal.payer)
    .then((id) => {
      let entry = {
        points: deal.points,
        timestamp: new Date(deal.timestamp),
        payerId: id
      }
      // console.log('Inserting: ', entry);
      return db('transactions').insert(entry, "id")
        .join('payers as p', 'p.id', 't.payerId')
        .select('p.name', 't.points', 't.timestamp')
  })
};
