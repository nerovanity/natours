const express = require('express');
const tourController = require('./../controllers/tourController');


const router = express.Router();

router.param('id', tourController.checkid);

router
.route('/')
.get(tourController.getalltours)
.post(tourController.checkreq,tourController.creattour);

router
.route('/:id')
.get(tourController.gettourbyid)
.patch(tourController.updatetour)
.delete(tourController.deletetour);


module.exports = router;