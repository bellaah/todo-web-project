const pool = require('./db');
const cardModel = require('../models/card');

const updateColumnName = async(listId,newName) => {
    let query = `UPDATE LIST SET NAME = ? WHERE LIST_ID = ? `;
    await pool.query(query,[newName,listId]);
}

const updateCardContent = (cardId,content,file) => {
    let query = `UPDATE CARD SET CONTENT = ?, EXTRA_FILE = ? WHERE CARD_ID = ? `;
    pool.query(query,[content,file,cardId]);
}

const addCard = async(card) => {
    let index = await getOrderIndex(card.listId);
    let query = `
    INSERT INTO
        CARD(LIST_ID, CONTENT, EXTRA_FILE, WRITER_ID, ORDER_INDEX)
        VALUES(?, ?, ?, ?, ?)`;
    pool.query(query,[card.listId,card.content,card.file,card.writer,index]);
}

const getOrderIndex = async(listId) => {
    let query = `SELECT COUNT(*) AS CARD_COUNT FROM CARD WHERE LIST_ID = ?`;
    return (await pool.query(query, [listId]))[0][0].CARD_COUNT;
}

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

    try {
        await pool.promise().query(query, [cardId]);
        await updateOrderIndex(
        undefined, 
        'ORDER_INDEX',
        'ORDER_INDEX - 1', 
        `ORDER_INDEX > ${orderIndex}`);
        return true;
    } catch (e) {
        throw e;
    }
}

const changeCardStatus = async(cardId, newColumnId, prevCardIndex) => {
    const cardSelectQuery = `SELECT * FROM CARD WHERE CARD_ID = ?`;

    try{
        const card = (await pool.promise().query(cardSelectQuery,[cardId]))[0][0];
        let currentOrderIndex = card.ORDER_INDEX;
        let newOrderIndex = prevCardIndex + 1;

        if (card.LIST_ID === newColumnId) {
            await _moveSameColumn(card, currentOrderIndex, newOrderIndex);
        }else {
            await _moveOtherColumn(card, newColumnId, currentOrderIndex, newOrderIndex);    
        }

        await updateOrderIndex(
            newColumnId, 
            'ORDER_INDEX',
            newOrderIndex, 
            `CARD_ID = ${card.ID}`);
    }catch(e){
        console.log(e);
    }
}

const updateOrderIndex = async(columnId, target, targetValue, whereClause) => {
    const query = `
        UPDATE
            CARD
        SET
            ${target} = ${targetValue}
        WHERE
            ${columnId ? 'LIST_ID = ?' : 'TRUE'} AND ${whereClause}`;

    try{
        await pool.promise().query(query, [columnId]);
        return true;
    }catch (e){
        throw e;
    }
}

const _moveSameColumn = (card, currentOrderIndex, newOrderIndex) => {
    if (currentOrderIndex > newOrderIndex) {
        await updateOrderIndex(
            card.LIST_ID, 
            'ORDER_INDEX',
            'ORDER_INDEX + 1', 
            `ORDER_INDEX BETWEEN ${newOrderIndex} AND ${currentOrderIndex - 1}`);
    }else{
      await updateOrderIndex(
        card.LIST_ID, 
        'ORDER_INDEX',
        'ORDER_INDEX - 1', 
        `ORDER_INDEX BETWEEN ${currentOrderIndex + 1} AND ${newOrderIndex}`);
        newOrderIndex--;
    }
}

const _moveOtherColumn = (card, newColumnId, currentOrderIndex, newOrderIndex) => {
    await updateOrderIndex(
        card.LIST_ID, 
        'ORDER_INDEX',
        'ORDER_INDEX - 1', 
        `ORDER_INDEX > ${currentOrderIndex}`);

    await updateOrderIndex(
        newColumnId,
        'ORDER_INDEX',
        'ORDER_INDEX + 1',
        `ORDER_INDEX >= ${newOrderIndex}`);

    await updateOrderIndex(
        card.LIST_ID,
        'COLUMN_ID',
        newColumnId,
        `CARD_ID = ${card.ID}`);
}


module.exports = { 
    getTodoList,removeCard,
    updateColumnName,updateCardContent,
    addCard,getOrderIndex,changeCardStatus,
};