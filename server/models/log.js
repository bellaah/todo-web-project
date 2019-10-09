const pool = require('../database/db');
const log = require('../database/logTable');

module.exports = {
    getLog : async(boardId) => {
        let [rows] = await pool.query(log.getLog,[boardId]);
    
        return rows.length ? rows : false;
    },

    addAction : async(actionObj) => {
    
    }
}
