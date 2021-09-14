/**
 * Defines the router for tables resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./tables.controller");

router
  .route("/")
  .get(controller.list)
  .post(controller.create);

module.exports = router;
