
exports.up = function(knex) {
  return knex.schema
  .createTable("payers", tbl => {
    tbl.increments();
    tbl.string("name", 128).notNullable().unique();
  })
  .createTable("transactions", tbl => {
    tbl.increments();
    tbl.integer("payerId")
        .unsigned()
        .references("id")
        .inTable('payers')
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    tbl.integer("points");
    tbl.datetime("timestamp");
    tbl.integer("debtFrom")
        .unsigned();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("transactions")
                    .dropTableIfExists("payers")
};
