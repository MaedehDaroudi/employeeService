const express = require("express");

const ctrl = require("../controllers/rootController");
const router = express.Router();

router.route("/dataService").post(ctrl.dataService);
router.route("/").get(ctrl.getData);
// Router.route("/").get(ctrl.)
// Router.route("/").get(ctrl.)

module.exports = router;
