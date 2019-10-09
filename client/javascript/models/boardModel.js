import Board from '../components/board.js';

class boardModel{
    async init(boardList){
        let board = new Board();
        await board.render(boardList);
        return;
    }
}

export default boardModel;