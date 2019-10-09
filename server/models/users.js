const pool = require('../database/db');
const user = require('../database/userTable');
const crypto = require('crypto');

module.exports = {
    getAllUsers : async() => {
        let [rows] = await pool.query(user.getAllUser);
        return rows.length ? rows : false;
    },

    insertUserData : async(userId,userName,userPwd) => {
        userPwd = crypto.createHash('sha512').update(userPwd).digest('base64');
        pool.query(user.insertUser, [userId,userName,userPwd]);
    },

    getUser : async(userId,userPwd) => {
        userPwd = crypto.createHash('sha512').update(userPwd).digest('base64');
        let [rows] = await pool.query(user.getUser, [userId,userPwd]);
        return rows.length ? rows[0] : false;
    },

    getUserId : async(userId) => {
        let [rows] = await pool.query(user.getUserId, [userId]);
        return rows.length ? rows[0] : false;
    },

    updateAuth : async(userList) => {
        userList.forEach(elem => {
            pool.query(user.updateAuthority,[elem.admin,elem.id]);
        });
    }
}