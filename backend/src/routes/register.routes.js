const express = require('express');
const registerRouter = express.Router();

const { 
    postRegisterController,
    getRegistersByUserController,
    getRegistersByOperationController,
    getTotalQuantitiesIOController,
    deleteRegisterByIdController
} = require('../controller/register.controller'); 

registerRouter.post('/api/register', postRegisterController); 
registerRouter.get('/api/register/byuser/:iduser', getRegistersByUserController); 
registerRouter.get('/api/register/byoperation/:idoperation', getRegistersByOperationController); 
registerRouter.get('/api/register/totalquantities/:iduser', getTotalQuantitiesIOController); 
registerRouter.delete('/api/register/byid/:idregister', deleteRegisterByIdController); 

module.exports = registerRouter;