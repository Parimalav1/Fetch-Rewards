const db = require("../data/connection.js");

module.exports = {
  spendPoints
}

function recordASpend(payerId, points, debtFrom) {
  // console.log('Recording a spend:', payerId, points, debtFrom);
  return db('transactions as t').insert({
    payerId: payerId,
    points: -points,
    debtFrom: debtFrom,
    timestamp: new Date()
  }).then(([id]) => {
    // console.log('recordASpend id:', id)
  })
}

function spendPoints(points) {
  // console.log('points: ', points);
  return db('transactions as t')
    .join('payers as p', 'p.id', 't.payerId')
    .select('t.id', 't.payerId', 'p.name', 't.points', 't.timestamp', 't.debtFrom')
    .orderBy('timestamp')
    .then((transactions) => {
      // console.log('transactions: ', transactions)
      d = {}
      for (i in transactions) {
        let t = transactions[i] 
        if (t.points > 0) {
          if (t.id in d) {
            prevPoints = d[t.id].points
            d[t.id] = t
            d[t.id].points += prevPoints
          } else {
            d[t.id] = t
          }
        } else {
          if (t.debtFrom in d) {
            d[t.debtFrom].points += t.points
          } else {
            d[t.debtFrom] = t
          }
        }
      }
      // console.log('d: ', d)
      let sortedList = Object.values(d).sort((a, b) => a.timestamp - b.timestamp);
      // console.log(sortedList);

      rv = {}
      i = 0
      while (points > 0 && i < sortedList.length) {
        // console.log('points: ', points)
        if (sortedList[i].points > 0) {
          if (points > sortedList[i].points){
            pointsFromI  = sortedList[i].points
          } else {
            pointsFromI  = points
          }
          payerNameFromI = sortedList[i].name
          payerIdFromI = sortedList[i].payerId
          points -= pointsFromI
          if (payerNameFromI in rv) {
            rv[payerNameFromI] += pointsFromI
          } else {
            rv[payerNameFromI] = pointsFromI
          }
          recordASpend(payerIdFromI, pointsFromI, sortedList[i].id)
          // console.log('points: ', points)
        }
        i++
      }
      return [rv, points]
    })
};
