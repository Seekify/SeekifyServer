const express = require('express');
const { PlaceController } = require('../controllers/PlaceController');
const PlaceRouter = express.Router();

PlaceRouter.route('/yelp/:id')
  .get(PlaceController.getPlaceByYelpId)

PlaceRouter.route('')
  .post(PlaceController.createPlace)

PlaceRouter.route('/:id')
  .get(PlaceController.getPlaceById)
  .put(PlaceController.updatePlaceById)
  .delete(PlaceController.deletePlaceWithId)

module.exports = PlaceRouter; 