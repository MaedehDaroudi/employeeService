const express = require('express');

const ctrl = require('../controllers/rootController');
const router = express.Router();

router.route('/dataService').post(ctrl.dataService);
// Router.route("/").get(ctrl.)
// Router.route("/").get(ctrl.)
// Router.route("/").get(ctrl.)

module.exports = router;
