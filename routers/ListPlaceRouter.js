const express = require('express');
const { PlaceController } = require('../controllers/PlaceController');
const { listPlaceController } = require('../controllers/ListPlaceContainer');
const ListPlaceRouter = express.Router();

ListPlaceRouter.route('/:list_id')
  .get(listPlaceController.getListPlaceByListId)
  .delete(listPlaceController.deleteListPlaceById)

ListPlaceRouter.route('')
  .post(listPlaceController.createListPlace)

module.exports = ListPlaceRouter; 