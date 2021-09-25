const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

//* Validation vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

async function reservationExists(req, res, next) {
  const { reservationId } = req.params;
  const reservation = await service.read(reservationId);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation with id: ${reservationId} was not found`,
  });
}

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidStatuses = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidStatuses.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidStatuses.join(", ")}`,
    });
  }
  next();
}

const hasRequiredProperties = hasProperties(...VALID_PROPERTIES);

const dateFormat = /^\d\d\d\d-\d\d-\d\d$/;
const timeFormat = /^\d\d:\d\d$/;

function timeIsValid(timeString) {
  return timeString.match(timeFormat)?.[0];
}

function dateFormatIsValid(dateString) {
  return dateString.match(dateFormat)?.[0];
}

function dateNotInPast(reservation_date, reservation_time) {
  const today = Date.now();
  const date = new Date(`${reservation_date} ${reservation_time}`);
  return date.valueOf() > today;
}

function timeDuringBizHours(reservation_time) {
  const open = "10:30";
  const close = "21:30";
  return reservation_time <= close && reservation_time >= open;
}

function dateNotTuesday(dateString) {
  const date = new Date(dateString);
  return date.getUTCDay() !== 2;
}

function hasValidValues(req, res, next) {
  const { reservation_date, reservation_time, people } = req.body.data;

  if (!Number.isInteger(people) || people < 1) {
    return next({
      status: 400,
      message: "# of people must be a whole number and >= 1",
    });
  }
  if (!timeIsValid(reservation_time)) {
    return next({
      status: 400,
      message: "reservation_time must be in HH:MM:SS (or HH:MM) format",
    });
  }
  if (!dateFormatIsValid(reservation_date)) {
    return next({
      status: 400,
      message: "reservation_date must be in YYYY-MM-DD (ISO-8601) format",
    });
  }
  if (!dateNotInPast(reservation_date, reservation_time)) {
    return next({
      status: 400,
      message:
        "The reservation_time and/or reservation_date is in the past. Only future reservations are allowed",
    });
  }
  if (!timeDuringBizHours(reservation_time)) {
    return next({
      status: 400,
      message: "The reservation time must be between 10:30 AM and 9:30 PM",
    });
  }
  if (!dateNotTuesday(reservation_date)) {
    return next({
      status: 400,
      message:
        "The reservation date is a Tuesday- but the restaurant is closed on Tuesdays",
    });
  }
  next();
}

function statusIsValid(req, res, next) {
  const { status } = req.body.data;
  const VALID_STATUSES = ["seated", "finished", "booked"];

  if (!VALID_STATUSES.includes(status)) {
    return next({
      status: 400,
      message: `${status} is an invalid status`,
    });
  }

  next();
}

//! Validation ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//* CRUD vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

// List handler for reservation resources
async function list(req, res) {
  const { date } = req.query;
  const reservations = await service.list(date);
  res.locals.data = reservations;
  const { data } = res.locals;
  res.json({ data: data });
}

// Read handler for reservation resources
async function read(req, res) {
  //* res.locals.reservation is being set from reservationExists()
  const { reservation } = res.locals;
  res.json({ data: reservation });
}

// Create handler for a new reservation
async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

// Update handler for reservation status
async function updateStatus(req, res) {
  const newStatus = req.body.data.status;
  const reservationId = res.locals.reservation.reservation_id;
  let data = await service.updateStatus(reservationId, newStatus);
  res.status(200).json({ data });
}

//! CRUD ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

module.exports = {
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    hasValidValues,
    asyncErrorBoundary(create),
  ],
  updateStatus: [
    reservationExists,
    statusIsValid,
    asyncErrorBoundary(updateStatus),
  ],
  list: asyncErrorBoundary(list),
  read: [reservationExists, asyncErrorBoundary(read)],
};
