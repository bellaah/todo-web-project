import BoardView from './components/board.js';
import BoardModel from './models/boardModel.js';
import ColumnView from './components/column.js';
import ColumnModel from './models/columnModel.js';
import {fetchData} from './src/util.js';

const getBoardData = async() => {
    let url = window.location.href.split('/');
    let boardList = await fetchData('/todo/getBoard','POST',{ userId : url[url.length-1] });
    return boardList;
}

(async() => {
    const boardList = await getBoardData();
    
    const boardView = new BoardView();
    const boardModel = new BoardModel();
    const columnView = new ColumnView();
    const columnModel = new ColumnModel();

    columnView.subscribe(columnModel);
    columnModel.subscribe(columnView);

    boardView.subscribe(boardModel);
    boardModel.subscribe(boardView);

    await boardView.render(boardList);
    columnView.init();
})()