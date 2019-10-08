const pool = require('../database/db');
const user = require('../database/userTable');
const crypto = require('crypto');

const getAllUsers = async() => {
    let [rows] = await pool.query(user.getAllUser);
  
    if (rows.length === 0){
        return false;
    }
    return rows;
};

const insertUserData = async(userId,userName,userPwd) => {
    userPwd = crypto.createHash('sha512').update(userPwd).digest('base64');
    pool.query(user.insertUser, [userId,userName,userPwd]);
    return;
};

const getUser = async(userId,userPwd) => {
    userPwd = crypto.createHash('sha512').update(userPwd).digest('base64');
    let [rows] = await pool.query(user.getUser, [userId,userPwd]);
    if (rows.length === 0){
        return false;
    }
    return rows[0];
};

const updateAuth = async(userList) => {
    userList.forEach(elem => {
        pool.query(todo.updateAuthority,[elem.admin,elem.id]);
    });
    return;
};


module.exports = { 
    getAllUsers,insertUserData,
    getUser,updateAuth
};