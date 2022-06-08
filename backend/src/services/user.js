const sql = require('mssql');
const { sqlConfig } = require('../db/connection');
 
async function getAllUsers(){
    try {
        let pool = await sql.connect(sqlConfig)
        let result = await pool.request() 
                    .query('select * from usuario');
        sql.close();
           
        return  result.recordset
    } catch (error) {
        console.log(error);
    }
}

async function postNewUser(data){
    try { 
        let pool = await sql.connect(sqlConfig);
        let emailExist = await pool.request()
                    .input("Email",data.Email)
                    .execute("spEmailExist");
         
        if(emailExist.recordset.length > 0){
            sql.close();
            return 1
        }else{
            await pool.request()
                    .input("Email", data.Email)
                    .input("Password", data.Password)
                    .execute("spAddNewUser");
            
            sql.close();
            return 2
        } 
    } catch (error) {
        console.log(error)
    }
}

async function userExist(data){
    try { 
        let pool = await sql.connect(sqlConfig);
        let userExist = await pool.request()
                    .input("Email",data.Email)
                    .input("Password", data.Password)
                    .execute("spUserExist");
         
        if(userExist.recordset.length > 0){
            sql.close();
            return userExist.recordset
        }else{
            sql.close();
            return null;
        } 
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllUsers,
    postNewUser,
    userExist,
}