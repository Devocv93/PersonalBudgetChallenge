const sql = require('mssql');
const { sqlConfig } = require('../db/connection');
 
const postNewRegister = async(data)=>{
    try { 
        let pool = await sql.connect(sqlConfig); 
        await pool.request()
            .input("Concepto",data.Concepto)
            .input("Monto",data.Monto)
            .input("Fecha",data.Fecha)
            .input("Tipo_Operacion",data.Tipo_Operacion)
            .input("Id_Categoria",data.Id_Categoria)
            .input("Id_Usuario",data.Id_Usuario)
            .execute("spAddNewRegister");
         
        sql.close(); 
    } catch (error) {
        sql.close();
        console.log(error);
    }
}

const getRegistersByUser = async(idUser)=>{
    try { 
        let pool = await sql.connect(sqlConfig); 
        const result = await pool.request()
            .input("Id_Usuario", idUser) 
            .execute("spGetOperationsByUser");
        sql.close(); 
        return result.recordsets;
    } catch (error) {
        sql.close();
        console.log(error);
    }
}

const getRegistersById = async(idOperation)=>{
    try { 
        let pool = await sql.connect(sqlConfig); 
        const result = await pool.request()
            .input("Id_Operacion", idOperation) 
            .execute("spGetOperationById");
        sql.close();  
        return result.recordsets;
    } catch (error) {
        sql.close();
        console.log(error);
    }
}

const getTotalQuantitiesIO = async(Id_Usuario)=>{
    try { 
        let pool = await sql.connect(sqlConfig); 
        const result = await pool.request()
            .input("Id_Usuario", Id_Usuario) 
            .execute("spGetTotalQuantitiesIO");
        sql.close();  
        return result.recordsets;
    } catch (error) {
        sql.close();
        console.log(error);
    }
}

const deleteRegisterById = async(idRegister)=>{
    try { 
        let pool = await sql.connect(sqlConfig); 
        await pool.request()
            .input("Id_Operacion", idRegister) 
            .execute("spDeleteOperationById");
         
        sql.close(); 
    } catch (error) {
        sql.close();
        console.log(error);
    }
}

module.exports = {
    postNewRegister, 
    getRegistersByUser,
    getRegistersById,
    getTotalQuantitiesIO,
    deleteRegisterById    
}