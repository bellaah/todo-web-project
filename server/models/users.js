const pool = require('../database/db');
const user = require('../database/userTable');
const crypto = require('crypto');

module.exports = {
    getAllUsers : async() => {
        let [rows] = await pool.query(user.getAllUser);
    
        if (rows.length === 0){
            return false;
        }
        return rows;
    },

    insertUserData : async(userId,userName,userPwd) => {
        userPwd = crypto.createHash('sha512').update(userPwd).digest('base64');
        pool.query(user.insertUser, [userId,userName,userPwd]);
        return;
    },

    getUser : async(userId,userPwd) => {
        userPwd = crypto.createHash('sha512').update(userPwd).digest('base64');
        let [rows] = await pool.query(user.getUser, [userId,userPwd]);
        if (rows.length === 0){
            return false;
        }
        return rows[0];
    },

    getUserId : async(userId) => {
        let [rows] = await pool.query(user.getUserId, [userId]);
        if (rows.length === 0){
            return false;
        }
        return rows[0];
    },

    updateAuth : async(userList) => {
        userList.forEach(elem => {
            pool.query(todo.updateAuthority,[elem.admin,elem.id]);
        });
        return;
    }
}