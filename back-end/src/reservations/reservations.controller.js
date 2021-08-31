const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const reservations = await service.list();
  if (reservations.length) {
    res.locals.data = reservations;
  }
  const { data } = res.locals;
  res.json({ data: data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
