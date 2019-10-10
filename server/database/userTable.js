module.exports={
    getAllUser : `SELECT * FROM USER;`,
    insertUser : `INSERT INTO USER VALUES (?, ?, ?,?);`,
    getUser : `SELECT * FROM USER WHERE ID = ? AND PASSWORD = ? ;`,
    getUserId : `SELECT * FROM USER WHERE ID = ? ;`,
    updateAuthority :  `UPDATE USER SET AUTHORITY = ? WHERE ID = ? ;`,
}