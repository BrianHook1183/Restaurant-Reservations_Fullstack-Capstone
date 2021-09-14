const knex = require("../db/connection");

// returns all tables
function list() {
  return knex("tables")
    .select("*")
    .orderBy("table_name");
}

// posts new table
function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((newTables) => newTables[0]);
}

module.exports = {
  list,
  create,
};
