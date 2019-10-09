const pool = require('../database/db');
const todo = require('../database/todoTable');

module.exports = {
    updateColumnName : async(listId,newName) => {
        await pool.query(todo.updateColumnName,[newName,listId]);
    },

    updateCardContent : (cardId,content,file) => {
        pool.query(todo.updateCard,[content,file,cardId]);
    },

    addCard : async(card) => {
        const [rows] = await pool.query(todo.getOrderIndex,[card.listId]);
        let index = rows[0].CARD_COUNT;
        pool.query(todo.insertCard,[card.listId,card.content,card.file,card.writer,index]);
    },

    getOrderIndex : async(listId) => {
        return (await pool.query(todo.getOrderIndex, [listId]))[0][0].CARD_COUNT;
    },

    getTodoList : async(userId) => {
        let [rows] = await pool.query(todo.getList,[userId]);

        if (rows.length === 0){
            return false;
        }

        let boardList = {};
        rows.forEach(elem => {
            if(boardList[elem.LIST_ID] == undefined){
                boardList[elem.LIST_ID] = {
                    "name" : elem.LIST_NAME,
                    "card" : [elem]
                };
            }else{
                boardList[elem.LIST_ID].card.push(elem);
            }
        });
        return boardList;
    },

    removeCard : async(cardId) => {
        pool.query(todo.removeCard,[cardId]);

        await pool.promise().query(query, [cardId]);
        await updateOrderIndex(undefined, 'ORDER_INDEX', 
            'ORDER_INDEX - 1', `ORDER_INDEX > ${orderIndex}`)
        .then()
        .catch(e => e);
        return true;
    },

    changeCardStatus : async(cardId, newColumnId, prevCardIndex) => {
        try{
            const card = (await pool.promise().query(todo.getCardById,[cardId]))[0][0];
            let currentOrderIndex = card.ORDER_INDEX;
            let newOrderIndex = prevCardIndex + 1;

            if (card.LIST_ID === newColumnId) {
                await _moveSameColumn(card, currentOrderIndex, newOrderIndex);
            }else {
                await _moveOtherColumn(card, newColumnId, currentOrderIndex, newOrderIndex);    
            }
            await updateOrderIndex(newColumnId, 'ORDER_INDEX', newOrderIndex, `CARD_ID = ${card.ID}`);
        }catch(e){
            console.log(e);
        }
    },

    updateOrderIndex : async(columnId, target, targetValue, whereClause) => {
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
    },

    _moveSameColumn : async(card, currentOrderIndex, newOrderIndex) => {
        if (currentOrderIndex > newOrderIndex) {
            await updateOrderIndex(card.LIST_ID, 'ORDER_INDEX', 'ORDER_INDEX + 1', 
                `ORDER_INDEX BETWEEN ${newOrderIndex} AND ${currentOrderIndex - 1}`);
        }else{
        await updateOrderIndex(card.LIST_ID, 'ORDER_INDEX','ORDER_INDEX - 1', 
                `ORDER_INDEX BETWEEN ${currentOrderIndex + 1} AND ${newOrderIndex}`);
            newOrderIndex--;
        }
    },

    _moveOtherColumn : async(card, newColumnId, currentOrderIndex, newOrderIndex) => {
        await updateOrderIndex(card.LIST_ID, 'ORDER_INDEX', 'ORDER_INDEX - 1', `ORDER_INDEX > ${currentOrderIndex}`);
        await updateOrderIndex(newColumnId, 'ORDER_INDEX', 'ORDER_INDEX + 1', `ORDER_INDEX >= ${newOrderIndex}`);
        await updateOrderIndex(card.LIST_ID, 'COLUMN_ID', newColumnId, `CARD_ID = ${card.ID}`);
    }
}