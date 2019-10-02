const pool = require('./db');

const getAllUsers = async() => {
    let query = `SELECT * FROM USER`;
    let [rows] = await pool.query(query);
  
    if (rows.length === 0){
        return false;
    }
    return await rows;
};

const insertUserData = async(userId,userName,userPwd) => {
    let query = `INSERT INTO USER VALUES ("${userId}","${userName}","${userPwd}")`;
    await pool.query(query);
    return;
};

const getUser = async(userId,userPwd) => {
    let query = `SELECT ID FROM USER WHERE ID="${userId}" AND PASSWORD="${userPwd}"`;
    let [rows] = await pool.query(query);
    if (rows.length === 0){
        return false;
    }
    return true;
};







module.exports = { 
    getAllUsers,insertUserData,
    getUser
};