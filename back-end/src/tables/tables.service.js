const knex = require("../db/connection");

// returns all reservations for the specified date
function list(date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date })
    .orderBy("reservation_time");
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
};
