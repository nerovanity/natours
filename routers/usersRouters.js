const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');


const router = express.Router();


router
.post('/signup', authController.signup);

router
.route('/')
.get(userController.getallusers)
.post(userController.creatuser);

router
.route('/:id')
.get(userController.getuserbyid)
.patch(userController.udpateuser)
.delete(userController.deleteuser);


module.exports = router;