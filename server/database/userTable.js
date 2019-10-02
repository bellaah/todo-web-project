const pool = require('./db');
const userModel = require('../models/users');
const crypto = require('crypto');

const getAllUsers = async() => {
    let query = `SELECT * FROM USER`;
    let [rows] = await pool.query(query);
  
    if (rows.length === 0){
        return false;
    }
    let userList = await rows.map((row) => userModel(row));
    return userList;
};

const insertUserData = async(userId,userName,userPwd) => {
    userPwd = crypto.createHash('sha512').update(userPwd).digest('base64');
    let query = `INSERT INTO USER VALUES ("${userId}","${userName}","${userPwd}")`;
    await pool.query(query);
    return;
};

const getUser = async(userId,userPwd) => {
    userPwd = crypto.createHash('sha512').update(userPwd).digest('base64');
    let query = `SELECT * FROM USER WHERE ID="${userId}" AND PASSWORD="${userPwd}"`;
    let [rows] = await pool.query(query);
    if (rows.length === 0){
        return false;
    }
    return userModel(rows[0]);
};

const updateAuth = async(userList) => {
    userList.forEach(elem => {
        pool.query(`UPDATE USER SET AUTHORITY = ${elem.admin} WHERE ID = "${elem.id}"`);
    });
    return;
};







module.exports = { 
    getAllUsers,insertUserData,
    getUser,updateAuth
};