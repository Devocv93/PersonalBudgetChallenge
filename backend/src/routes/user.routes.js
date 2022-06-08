const express = require('express');
const userRouter = express.Router();

const { getAllUserController, addNewUser, loginUser } = require('../controller/user.controller')

userRouter.get('/api/user/allUsers', getAllUserController);
userRouter.post('/api/user/addUser', addNewUser);
userRouter.post('/api/user/login', loginUser )

module.exports = userRouter;