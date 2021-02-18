
exports.seed = function(knex) {
  // Inserts seed entries
  return knex('payers').insert([
    {
    id: 1, 
    payer: 'DANNON', 
    },
    {
    id: 2, 
    payer: 'UNILEVER',
    },
    {
    id: 3, 
    payer: 'MILLER COORS',
    }
  ]);
};
