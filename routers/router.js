const express = require('express');
const { listController } = require('../controllers/controller');
const ListRouter = express.Router();

ListRouter.route('')
  .post(listController.createList)

  ListRouter.route('/:list_id')
  .put(listController.updateListDetails)
  .delete(listController.deleteListById)

  ListRouter.route('/user/:username')
  .get(listController.getListsByUsername)

module.exports = ListRouter;