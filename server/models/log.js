const pool = require('../database/db');
const log = require('../database/logTable');

module.exports = {
    getLog : async(boardId) => {
        let [rows] = await pool.query(log.getLog,[boardId]);
    
        if (rows.length === 0){
            return false;
        }
        return rows;
    },

    addAction : async(actionObj) => {
    
    }
}
