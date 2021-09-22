const knex = require("../db/connection");

// returns all tables
function list() {
  return knex("tables").select("*").orderBy("table_name");
}

// posts new table
function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((newTables) => newTables[0]);
}

// returns a reservation for the specified id
function read(id) {
  return knex("tables")
    .select("*")
    .where({ table_id: id })
    .then((result) => result[0]);
}

// updates table after being assigned a reservation
function update(updatedTable) {
  return knex("tables")
    .select("*")
    .where({ table_id: updatedTable.table_id })
    .update(updatedTable, "*")
    .then((updatedTables) => updatedTables[0]);
}

module.exports = {
  create,
  read,
  update,
  list,
};
