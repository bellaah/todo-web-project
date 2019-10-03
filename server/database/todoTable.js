const pool = require('./db');
const cardModel = require('../models/card');

const getTodoList = async(userId) => {
    let query = `
    SELECT
        LIST.NAME AS LIST_NAME,
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
                "card" : [cardModel(elem)]
            };
        }else{
            boardList[elem.LIST_ID].card.push(cardModel(elem));
        }
    });

    return boardList;
};

const removeCard = (cardId) => {
    let query = `DELETE FROM CARD WHERE CARD_ID = ?`;
    pool.query(query,[cardId]);
}

const updateColumn = async(listId,newName) => {
    let query = `UPDATE LIST SET NAME = ? WHERE LIST_ID = ? `;
    await pool.query(query,[newName,listId]);
}

const updateCard = (cardId,content,file) => {
    let query = `UPDATE CARD SET CONTENT = ?, EXTRA_FILE = ? WHERE CARD_ID = ? `;
    pool.query(query,[content,file,cardId]);
}

const addCard = async(card) => {
    let index = await getOrderIndex(card.listId);
    let query = `
    INSERT INTO
        CARD(LIST_ID, CONTENT, EXTRA_FILE, WRITER_ID, ORDER_INDEX)
        VALUES(?, ?, ?, ?, ?);`;

    pool.query(query,[card.listId,card.content,card.file,card.writer,index]);
}

const getOrderIndex = async(listId) => {
    let query = `
    SELECT 
      COUNT(*) AS CARD_COUNT 
    FROM 
      CARD 
    WHERE 
      LIST_ID = ?;`;
    return (await pool.query(query, [listId]))[0][0].CARD_COUNT;
}

module.exports = { 
    getTodoList,removeCard,
    updateColumn,updateCard,
    addCard,getOrderIndex
};