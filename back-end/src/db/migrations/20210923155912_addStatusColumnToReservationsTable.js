exports.up = function (knex) {
  return knex.schema.table("reservations", (table) => {
    table.string("reservation_status").notNullable().defaultTo("booked");
  });
};

exports.down = function (knex) {
  return knex.schema.table("reservations", (table) => {
    table.dropColumn("reservation_status");
  });
};
