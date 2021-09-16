const knex = require("../db/connection");

// returns all reservations for the specified date
function list(date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date })
    .orderBy("reservation_time");
}

// returns a reservation for the specified id
function read(id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: id });
}

// posts new reservation and then returns it
function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((newReservations) => newReservations[0]);
}

module.exports = {
  list,
  create,
  read,
};
