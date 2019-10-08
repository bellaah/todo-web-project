const pool = require('../database/db');
const log = require('../database/logTable');

const getLog = async(boardId) => {
    let [rows] = await pool.query(log.getLog,[boardId]);
  
    if (rows.length === 0){
        return false;
    }
    return rows;
};

const addAction = async(actionObj) => {
   
};



module.exports = { 
    getLog,addAction
};