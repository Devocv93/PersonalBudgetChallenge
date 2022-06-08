const { getAllUsers, postNewUser, userExist } = require('../services/user');
const { request, response } = require('express')

const getAllUserController = async (req = request, res = response) => {
    const result = await getAllUsers();
    res.status(200).send(result);
}

const addNewUser = async(req = request, res = response) =>{
    let data = { ...req.body }
    const post = await postNewUser(data);

    if(post === 1) res.status(200).send({msg:"Email exist already!"});
    if(post === 2) res.status(201).send({msg: "Account created successfully!"});
}

const loginUser = async(req = request, res = response) =>{
    let data = { ...req.body }
    const verifyUser = await userExist(data); 
    if(verifyUser === null) res.status(204).send({msg: "User not found!"});
    if(verifyUser) res.status(200).send(verifyUser);
}

module.exports = {
    getAllUserController,
    addNewUser,
    loginUser
}