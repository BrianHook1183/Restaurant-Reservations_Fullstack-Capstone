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
  "reservation_id",
  "created_at",
  "updated_at",
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

function dateNotInPast(dateString, timeString) {
  const now = new Date();
  // creating a date object using a string like:  '2021-10-08T01:21:00'
  const reservationDate = new Date(dateString + "T" + timeString);
  return reservationDate >= now;
}

function timeDuringBizHours(timeString) {
  const open = "10:30";
  const close = "21:30";
  return timeString <= close && timeString >= open;
}

function dateNotTuesday(dateString) {
  const date = new Date(dateString);
  return date.getUTCDay() !== 2;
}

function statusIsBookedOrNull(status) {
  if (!status || status === "booked") {
    return true;
  } else {
    return false;
  }
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
      message: `You are attempting to submit a reservation in the past. Only future reservations are allowed`,
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
  if (!statusIsBookedOrNull(req.body.data?.status)) {
    return next({
      status: 400,
      message: '"seated" and "finished" are not valid statuses upon creation',
    });
  }
  next();
}

function statusIsValid(req, res, next) {
  const { status } = req.body.data;
  const VALID_STATUSES = ["seated", "finished", "booked", "cancelled"];

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

function statusIsBooked(req, res, next) {
  const { status } = res.locals.reservation;
  if (status !== "booked") {
    return next({
      status: 400,
      message: 'Only "booked" reservations may be edited',
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
//* res.locals.reservation is being set from reservationExists()
async function read(req, res) {
  const { reservation } = res.locals;
  res.json({ data: reservation });
}

// Create handler for a new reservation
async function create(req, res) {
  const reservation = await service.create(req.body.data);
  res.status(201).json({ data: reservation });
}

// Update handler for reservation status
async function updateStatus(req, res) {
  const newStatus = req.body.data.status;
  const { reservation_id } = res.locals.reservation;
  let data = await service.updateStatus(reservation_id, newStatus);
  res.status(200).json({ data: { status: newStatus } });
}

// Update handler for reservation status
async function update(req, res) {
  const { reservation_id } = res.locals.reservation;
  const newReservationDetails = req.body.data;
  const existingReservation = res.locals.reservation;
  const mergedReservation = {
    ...existingReservation,
    ...newReservationDetails,
  };
  let updatedReservation = await service.update(
    reservation_id,
    mergedReservation
  );
  res.status(200).json({ data: updatedReservation });
}

//! CRUD ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

module.exports = {
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    hasValidValues,
    asyncErrorBoundary(create),
  ],
  update: [
    asyncErrorBoundary(reservationExists),
    hasOnlyValidProperties,
    hasRequiredProperties,
    hasValidValues,
    statusIsBooked,
    asyncErrorBoundary(update),
  ],
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    statusIsValid,
    statusNotFinished,
    asyncErrorBoundary(updateStatus),
  ],
  list: [hasValidQuery, asyncErrorBoundary(list)],
  read: [reservationExists, asyncErrorBoundary(read)],
};
