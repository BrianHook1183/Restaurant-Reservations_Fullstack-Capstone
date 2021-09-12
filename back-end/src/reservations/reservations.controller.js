const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

//* Validation vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

//TODO US-03
/* 
* The /reservations API will return 400, along with an informative error message, if any of the following additional constraints are violated:
TODO --- The reservation time is before 10:30 AM.

TODO --- The reservation time is after 9:30 PM, because the restaurant closes at 10:30 PM and the customer needs to have time to enjoy their meal.

TODO --- The reservation date and time combination is in the past. Only future reservations are allowed. E.g., if it is noon, only allow reservations starting after noon today.
*/

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

const hasRequiredProperties = hasProperties(...VALID_PROPERTIES);

const dateFormat = /^\d\d\d\d-\d\d-\d\d$/;
const timeFormat = /^\d\d:\d\d$/;

function dateFormatIsValid(dateString) {
  return dateString.match(dateFormat)?.[0];
}

function dateNotTuesday(dateString) {
  const date = new Date(dateString);
  return date.getUTCDay() !== 2;
}

function dateNotInPast(reservation_date, reservation_time) {
  const today = Date.now();
  const date = new Date(`${reservation_date} ${reservation_time}`).valueOf();
  return date > today;
}

function timeIsValid(timeString) {
  return timeString.match(timeFormat)?.[0];
}

function hasValidValues(req, res, next) {
  const { reservation_date, reservation_time, people } = req.body.data;

  if (!dateFormatIsValid(reservation_date)) {
    return next({
      status: 400,
      message: "reservation_date must be in YYYY-MM-DD (ISO-8601) format",
    });
  }
  if (!dateNotTuesday(reservation_date)) {
    return next({
      status: 400,
      message:
        "The reservation date is a Tuesday- but the restaurant is closed on Tuesdays",
    });
  }
  if (!dateNotInPast(reservation_date, reservation_time)) {
    return next({
      status: 400,
      message:
        "The reservation_time and/or reservation_date is in the past. Only future reservations are allowed",
    });
  }
  if (!timeIsValid(reservation_time)) {
    return next({
      status: 400,
      message: "reservation_time must be in HH:MM:SS (or HH:MM) format",
    });
  }
  if (!Number.isInteger(people) || people < 1) {
    return next({
      status: 400,
      message: "# of people must be a whole number and >= 1",
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

// Create handler for a new reservation
async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

//! CRUD ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

module.exports = {
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    hasValidValues,
    asyncErrorBoundary(create),
  ],
  list: asyncErrorBoundary(list),
};
