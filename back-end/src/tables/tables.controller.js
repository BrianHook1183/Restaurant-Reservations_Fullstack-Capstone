const service = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

//* Validation vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

async function hasReservationId(req, res, next) {
  if (req.body?.data?.reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: `reservation_id is missing from request`,
  });
}

async function reservationExists(req, res, next) {
  const { reservation_id } = req.body.data;
  const reservation = await reservationsService.read(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation with id: ${reservation_id} was not found`,
  });
}

async function tableExists(req, res, next) {
  const { table_id } = req.params;
  const table = await service.read(table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({
    status: 404,
    message: `Table with id: ${table_id} was not found`,
  });
}

function tableIsBigEnough(req, res, next) {
  const { table, reservation } = res.locals;
  if (table.capacity >= reservation.people) {
    return next();
  }
  next({
    status: 400,
    message: `Table with id: ${table.table_id} does not have the capacity to seat this reservation: capacity must be at least ${reservation.people}`,
  });
}

function tableIsFree(req, res, next) {
  const { table } = res.locals;
  if (!table.reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: `Table with id: ${table.table_id} is already occupied`,
  });
}

function tableIsOccupied(req, res, next) {
  const { table } = res.locals;
  if (table.reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: `Table with id: ${table.table_id} is not occupied`,
  });
}

const VALID_PROPERTIES = ["table_name", "capacity", "reservation_id"];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;
  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

const hasRequiredProperties = hasProperties(...["table_name", "capacity"]);

//TODO table_name should have to be unique. Can currently post "#5" twice.

function tableNameIsValid(tableName) {
  return tableName.length > 1;
}

function capacityIsValid(capacity) {
  return Number.isInteger(capacity) && capacity >= 1;
}

function hasValidValues(req, res, next) {
  const { table_name, capacity } = req.body.data;

  if (!capacityIsValid(capacity)) {
    return next({
      status: 400,
      message: "capacity must be a whole number greater than or equal to 1",
    });
  }
  if (!tableNameIsValid(table_name)) {
    return next({
      status: 400,
      message: "table_name must be more than one character",
    });
  }
  next();
}

//! Validation ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//* CRUDL vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

async function list(req, res) {
  const tables = await service.list();
  res.locals.data = tables;
  const { data } = res.locals;
  res.json({ data: data });
}

// Create handler for a new table
async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

// Read a table
async function read(req, res) {
  //* res.locals.table is being set from tableExists()
  const { table } = res.locals;
  res.json({ data: table });
}

// update handler for assigning a reservation to a table
async function update(req, res) {
  const { table } = res.locals;
  const { reservation_id } = req.body.data;
  const assignedTable = {
    ...table,
    reservation_id,
  };
  const data = await service.update(assignedTable);
  res.json({ data });
}

//TODO idea: setFree can have its own validations and then just piggy back on update(req, res) - would just need logic for res_id or not.
// handler for removing a reservation from a table thereby changing it from "Occupied" to "Free"
async function setFree(req, res) {
  console.log("controller.setFree() ran");
  const { table } = res.locals;
  const releasedTable = {
    ...table,
    reservation_id: null,
  };
  console.log("releasedTable:", releasedTable);
  const data = await service.update(releasedTable);
  res.json({ data, status: `Table ${table.table_id} is now free` });
  // res.json({ data });
}

//! CRUDL ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

module.exports = {
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    hasValidValues,
    asyncErrorBoundary(create),
  ],
  read: [tableExists, asyncErrorBoundary(read)],
  list: asyncErrorBoundary(list),
  update: [
    hasReservationId,
    reservationExists,
    tableExists,
    tableIsBigEnough,
    tableIsFree,
    asyncErrorBoundary(update),
  ],
  // TODO idea: setFree can have its own validations and then still use asyncErrorBoundary(update)
  setFree: [tableExists, tableIsOccupied, asyncErrorBoundary(setFree)],
  list: asyncErrorBoundary(list),
};
