
exports.seed = function(knex) {
  // Inserts seed entries
  return knex('transactions').insert([
    {
    id: 1, 
    userId: 1,
    payerId: 1,
    points: 300,
    timeStamp: "2020-11-02T14:00:00Z",
    },
    {
    id: 2,
    userId: 1,
    payerId: 2,
    points: 200,
    timeStamp: "2020-11-03T14:00:00Z",
    },
    {
    id: 3,
    userId: 1,
    payerId: 3,
    points: 300,
    timeStamp: "2020-11-04T14:00:00Z",
    }
  ]);
};
