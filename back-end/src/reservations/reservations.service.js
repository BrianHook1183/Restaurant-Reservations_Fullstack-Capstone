const knex = require("../db/connection");

// returns non-finished reservations for the specified date
function searchByDate(date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date })
    .whereNot("status", "finished")
    .orderBy("reservation_time");
}

// returns all reservations that partial match the specified phone number
function searchByPhone(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

// returns a reservation for the specified id
function read(id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: Number(id) })
    .then((result) => result[0]);
}

// posts new reservation and then returns it
function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((result) => result[0]);
}

// updates reservation status
function updateStatus(reservation_id, status) {
  return knex("reservations").where({ reservation_id }).update({ status }, "*");
}

// updates reservation
function update(reservation_id, updatedReservation) {
  return knex("reservations")
    .where({ reservation_id })
    .update(updatedReservation, "*")
    .then((result) => result[0]);
}

module.exports = {
  searchByDate,
  searchByPhone,
  create,
  read,
  updateStatus,
  update,
};
