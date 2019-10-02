const pool = require('./db');

const getAllUsers = async () => {
    let query = `SELECT * FROM USER`;
    let [rows] = await pool.query(query);
  
    if (rows.length === 0){
        return false;
    }
    return await rows;
};

module.exports = { getAllUsers };