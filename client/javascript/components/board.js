import Column from './column.js';
import {$} from '../src/util.js';

class board{
    async render(boardList){
        let board = $(".board");

        let column = new Column();
        for (let columnId in boardList) {
            let html = await column.render(columnId,boardList[columnId]);
            board.insertAdjacentHTML('beforeend',html);
        }
    }
}

export default board;