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
  "status",
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

const REQUIRED_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

const hasRequiredProperties = hasProperties(...REQUIRED_PROPERTIES);

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

function statusIsBookedOrNull(status) {
  // const acceptedStatuses = ["booked"];
  // const rejectedStatuses = ["finished", "seated"];
  if (!status || status === "booked") {
    return true;
  } else {
    return false;
  }
}

function hasValidValues(req, res, next) {
  const { reservation_date, reservation_time, people, status } = req.body.data;

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
  if (!statusIsBookedOrNull(status)) {
    return next({
      status: 400,
      message: '"seated" and "finished" are not valid statuses upon creation',
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

function statusNotFinished(req, res, next) {
  const { status } = res.locals.reservation;

  if (status === "finished") {
    return next({
      status: 400,
      message: `a finished reservation cannot be updated`,
    });
  }

  next();
}

function hasValidQuery(req, res, next) {
  const { date, mobile_number } = req.query;
  if (!date && !mobile_number) {
    return next({
      status: 400,
      message: `Either a ?date or ?mobile_number query is needed`,
    });
  }

  next();
}

//! Validation ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//* CRUD vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

// List handler for reservation resources
async function list(req, res) {
  const { mobile_number, date } = req.query;
  const reservations = await (mobile_number
    ? service.searchByPhone(mobile_number)
    : service.searchByDate(date));
  res.json({ data: reservations });
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
  res.status(200).json({ data: { status: newStatus } });
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
    statusNotFinished,
    asyncErrorBoundary(updateStatus),
  ],
  list: [hasValidQuery, asyncErrorBoundary(list)],
  read: [reservationExists, asyncErrorBoundary(read)],
};
