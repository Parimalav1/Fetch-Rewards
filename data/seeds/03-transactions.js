
exports.seed = function(knex) {
  // Inserts seed entries
  return knex('transactions').insert([
    {
    id: 1, 
    payerId: 1,
    points: 300,
    timeStamp: "2020-10-31T10:00:00Z",
    debtFrom: 0,
    },
    {
    id: 2,
    payerId: 2,
    points: 200,
    timeStamp: "2020-10-31T11:00:00Z",
    debtFrom: 0,
    },
    {
    id: 3,
    payerId: 3,
    points: -200,
    timeStamp:  "2020-10-31T15:00:00Z",
    debtFrom: 1,
    }
  ]);
};
