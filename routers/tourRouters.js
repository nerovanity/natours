const express = require('express');
const tourController = require('./../controllers/tourController');


const router = express.Router();

router
.route('/')
.get(tourController.getalltours)
.post(tourController.creattour);

router
.route('/:id')
.get(tourController.gettourbyid)
.patch(tourController.updatetour)
.delete(tourController.deletetour);


module.exports = router;