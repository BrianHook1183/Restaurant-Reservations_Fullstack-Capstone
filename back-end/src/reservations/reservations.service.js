const knex = require("../db/connection");

// returns all reservations for the specified date
function list(date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date })
    .whereNot({ status: "finished" })
    .orderBy("reservation_time");
}

// returns a reservation for the specified id
function read(id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: id })
    .then((result) => result[0]);
}

// posts new reservation and then returns it
function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((newReservations) => newReservations[0]);
}

// updates reservation status
function updateStatus(reservation_id, status) {
  return knex("reservations").where({ reservation_id }).update({ status }, "*");
}

module.exports = {
  list,
  create,
  read,
  updateStatus,
};
