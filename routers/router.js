const express = require('express');
const { listController } = require('../controllers/controller');
const router = express.Router();

router.route('/list', {
  get: listController.createList
})

module.exports = router;