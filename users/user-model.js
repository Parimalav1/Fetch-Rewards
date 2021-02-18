const db = require("../data/connection.js");

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};

function find() {
  return db('users').select('id', 'name').orderBy('id');
};

function findById(id) {
  // console.log('findById', id);
  return db('users').where({
    id
  }).select('id', 'name').first();
};

function add(user) {
  return db('users').insert(user, "id")
  .then(([userId]) => {
    // console.log(userId);
    return findById(userId);
  })
};

function update(id, changes) {
  // console.log(id, changes);
  return db('users').where({
    id
  }).update(changes)
  .then((rv) => {
    // console.log(rv);
    return findById(id);
  })
};

function remove(id) {
  return db('users').where({
    id
  }).delete();
};
