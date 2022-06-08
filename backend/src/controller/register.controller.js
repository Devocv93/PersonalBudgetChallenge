const { request, response } = require("express")
const { 
    postNewRegister,
    getRegistersByUser,
    getRegistersById,
    getTotalQuantitiesIO,
    deleteRegisterById
} = require("../services/register")

const postRegisterController = async(req=request, res = response)=>{
    try {
        const { Concepto, Monto, Fecha, Tipo_Operacion, Id_Categoria, Id_Usuario } = req.body
        const data = {Concepto, Monto, Fecha, Tipo_Operacion,Id_Categoria,Id_Usuario};
        await postNewRegister(data);
        res.status(201).send({msg: 'Data added succeddful'});
    } catch (error) { 
        return res.status(500).send(error)
    }
}

const getRegistersByUserController = async(req=request, res = response)=>{
    try {
        const { iduser } = req.params;
        const result = await getRegistersByUser(iduser);
        res.status(200).send(result);
    } catch (error) { 
        return res.status(500).send(error)
    }
}

const getRegistersByOperationController = async(req=request, res = response)=>{
    try {
        const { idoperation } = req.params;
        const result = await getRegistersById(idoperation);
        res.status(200).send(result);
    } catch (error) { 
        return res.status(500).send(error)
    }
}

const getTotalQuantitiesIOController = async(req=request, res = response)=>{
    try {
        const { iduser } = req.params;
        const result = await getTotalQuantitiesIO(iduser);
        res.status(200).send(result);
    } catch (error) { 
        return res.status(500).send(error)
    }
}

const deleteRegisterByIdController = async(req=request, res = response)=>{
    try {
         
        await deleteRegisterById(req.params.idregister);
        res.status(200).send({msg: 'Data added succeddful'});
    } catch (error) { 
        return res.status(500).send(error)
    }
}

module.exports = {
    postRegisterController,
    getRegistersByUserController,
    getRegistersByOperationController,
    getTotalQuantitiesIOController,
    deleteRegisterByIdController
}

