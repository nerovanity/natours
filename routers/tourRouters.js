const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.param('id', tourController.checkid);
router
.route('/top-5-cheap')
.get(tourController.aliastopfivecheap, tourController.getalltours);

router.route('/tour-stats').get(tourController.getTourStats);

router
.route('/')
.get(authController.protect, tourController.getalltours)
.post(tourController.creattour);

router
.route('/:id')
.get(tourController.gettourbyid)
.patch(tourController.updatetour)
.delete(authController.protect, 
    authController.restrictTo('admin', 'lead-guide'), 
    tourController.deletetour);


module.exports = router;