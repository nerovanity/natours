const express = require('express');
const userController = require('./../controllers/userController');
const router = express.Router();

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