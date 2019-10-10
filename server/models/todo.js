const pool = require('../database/db');
const todo = require('../database/todoTable');

class Todo{
    async updateColumnName(listId,newName){
        await pool.query(todo.updateColumnName,[newName,listId]);
    }

    async insertNewUserBoard(userId){
        await pool.query(todo.insertNewBoard, [userId]);
        let [rows]= await pool.query(todo.getBoardIdByUserId,[userId]);
        await pool.query(todo.insertNewColumn, [rows[0].BOARD_ID,"todo"]);
        await pool.query(todo.insertNewColumn, [rows[0].BOARD_ID,"doing"]);
        await pool.query(todo.insertNewColumn, [rows[0].BOARD_ID,"done"]);
    }

    updateCardContent(cardId,content,file){
        pool.query(todo.updateCard,[content,file,cardId]);
    }

    async addCard(card){
        const [rows] = await pool.query(todo.getOrderIndex,[card.listId]);
        let index = rows[0].CARD_COUNT;
        await pool.query(todo.insertCard,[card.listId,card.content,card.file,card.writer,index]);
        return await this.getMaxCardId();
    }

    async getMaxCardId(){
        const [rows] = await pool.query(todo.getLastCard);
        return rows[0];
    }

    async getOrderIndex(listId){
        return (await pool.query(todo.getOrderIndex, [listId]))[0][0].CARD_COUNT;
    }
   
    async getTodoList(userId){
        let [rows] = await pool.query(todo.getList,[userId]);
        if (rows.length === 0){
            [rows] = await pool.query(todo.getEmptyList,[userId]);
            return this.makeBoardList(true,rows);
        }else{
            return this.makeBoardList(false,rows);
        }
    }

    makeBoardList(isEmptyColumn,rows){
        let boardList = {};
        rows.forEach(elem => {
            if(boardList[elem.LIST_ID] == undefined){
                boardList[elem.LIST_ID] = {
                    "name" : isEmptyColumn ? elem.NAME : elem.LIST_NAME,
                    "card" : isEmptyColumn ? [] : [elem]
                };
            }else{
                boardList[elem.LIST_ID].card.push(elem);
            }
        });
        return boardList;
    }

    async removeCard(data){
        await pool.query(todo.removeCard,[data.cardId]);
        await this.updateOrderIndex(data.columnId, 'ORDER_INDEX', 
            'ORDER_INDEX - 1', `ORDER_INDEX > ${data.orderIndex}`);
    }

    async changeCardStatus(cardId, newColumnId, prevCardIndex){
        try{
            const card = (await pool.promise().query(todo.getCardById,[cardId]))[0][0];
            let currentOrderIndex = card.ORDER_INDEX;
            let newOrderIndex = prevCardIndex + 1;

            if (card.LIST_ID === newColumnId) {
                await this._moveSameColumn(card, currentOrderIndex, newOrderIndex);
            }else {
                await this._moveOtherColumn(card, newColumnId, currentOrderIndex, newOrderIndex);    
            }
            await this.updateOrderIndex(newColumnId, 'ORDER_INDEX', newOrderIndex, `CARD_ID = ${card.ID}`);
        }catch(e){
            console.log(e);
        }
    }

    async updateOrderIndex(columnId, target, targetValue, whereClause){
        const query = `
            UPDATE 
                CARD 
            SET 
                ${target} = ${targetValue} 
            WHERE 
                ${columnId ? 'LIST_ID = ?' : 'TRUE'} AND ${whereClause};`;
        await pool.query(query, [columnId]);
    }

    async _moveSameColumn(card, currentOrderIndex, newOrderIndex){
        if (currentOrderIndex > newOrderIndex) {
            await this.updateOrderIndex(card.LIST_ID, 'ORDER_INDEX', 'ORDER_INDEX + 1', 
                `ORDER_INDEX BETWEEN ${newOrderIndex} AND ${currentOrderIndex - 1}`);
        }else{
        await this.updateOrderIndex(card.LIST_ID, 'ORDER_INDEX','ORDER_INDEX - 1', 
                `ORDER_INDEX BETWEEN ${currentOrderIndex + 1} AND ${newOrderIndex}`);
            newOrderIndex--;
        }
    }

    async _moveOtherColumn(card, newColumnId, currentOrderIndex, newOrderIndex){
        await this.updateOrderIndex(card.LIST_ID, 'ORDER_INDEX', 'ORDER_INDEX - 1', `ORDER_INDEX > ${currentOrderIndex}`);
        await this.updateOrderIndex(newColumnId, 'ORDER_INDEX', 'ORDER_INDEX + 1', `ORDER_INDEX >= ${newOrderIndex}`);
        await this.updateOrderIndex(card.LIST_ID, 'COLUMN_ID', newColumnId, `CARD_ID = ${card.ID}`);
    }
}

module.exports = Todo;