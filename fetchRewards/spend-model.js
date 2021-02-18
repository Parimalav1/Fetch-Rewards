const db = require("../data/connection.js");

module.exports = {
  spendPoints
}

function recordASpend(payerId, points, debtFrom) {
  return db('transactions as t').insert({
    payerId: payerId,
    points: points,
    debtFrom: debtFrom
  })
}

function spendPoints(points) {
  // console.log(id, changes);
  return db('transactions as t')
    .join('payers as p', 'p.id', 't.payerId')
    .select('t.id', 't.payerId', 'p.name', 't.points', 't.debtFrom')
    .then((transactions) => {
      d = {}
      for (t in transactions) {
        if (t.points > 0) {
          d[t.id] = (t.points, t.name, t.payerId)
        } else {
          d[t.debtFrom][0] += t.points
        }
      }
      rv = {}
      i = 1
      while (points > 0){
        if (i in d && d[i] > 0){
          if (points > d[i]){
            pointsFromI  = d[i][0]
          } else {
            pointsFromI  = points
          }
          payerNameFromI = d[i][1]
          payerIdFromI = d[i][2]
          points -= pointsFromI
          rv[payerNameFromI] = pointsFromI
          recordASpend(payerIdFromI, pointsFromI, i)
        }
        i++
      }
      return rv
    })
};
