const pool = require('./db');
const columnModel = require('../models/column');

const getTodoList = async(userId) => {
    let query = `
    SELECT
        LIST.NAME AS LIST_NAME,
        CARD.TITLE AS CARD_TITLE,
        CARD.CONTENT AS CARD_CONTENT,
        CARD.EXTRA_FILE AS CARD_EXTRA_FILE,
        CARD.WRITER_ID AS CARD_WRITER_ID,
        CARD.CARD_ID AS CARD_ID,
        LIST.LIST_ID AS LIST_ID
    FROM
        (SELECT BOARD_ID FROM BOARD WHERE USER_ID = ? ) AS BOARD
    JOIN
        LIST
    ON
        BOARD.BOARD_ID = LIST.BOARD_ID
    JOIN
        CARD
    ON
        LIST.LIST_ID = CARD.LIST_ID`;

    let [rows] = await pool.query(query,[userId]);

    if (rows.length === 0){
        return false;
    }

    let boardList = {};
    rows.forEach(elem => {
        if(boardList[elem.LIST_ID] == undefined){
            boardList[elem.LIST_ID] = {
                "name" : elem.LIST_NAME,
                "card" : [columnModel(elem)]
            };
        }else{
            boardList[elem.LIST_ID].card.push(columnModel(elem));
        }
    });

    return boardList;
};

const removeCard = async(cardId) => {
    let query = `DELETE FROM CARD WHERE CARD_ID = ?`;
    await pool.query(query,[cardId]);
    return;
}

const updateColumn = async(listId,newName) => {
    let query = `UPDATE LIST SET NAME = ? WHERE LIST_ID = ? `;
    await pool.query(query,[newName,listId]);
    return;
}


module.exports = { 
    getTodoList,removeCard,
    updateColumn
};