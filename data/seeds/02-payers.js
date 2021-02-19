
exports.seed = function(knex) {
  // Inserts seed entries
  return knex('payers').insert([
    {
    id: 1, 
    name: 'DANNON', 
    },
    {
    id: 2, 
    name: 'UNILEVER',
    },
    {
    id: 3, 
    name: 'MILLER COORS',
    }
  ]);
};
