import BoardView from './components/board.js';
import ColumnModel from './models/columnModel.js';
import ColumnView from './components/column.js';
import {fetchData} from './src/util.js';

const getBoardData = async() => {
    let url = window.location.href.split('/');
    let boardList = await fetchData('/todo/getBoard','POST',{ userId : url[url.length-1] });
    return boardList;
}

(async() => {
    const boardList = await getBoardData();
    
    const boardView = new BoardView();
    const columnView = new ColumnView();
    const columnModel = new ColumnModel();

    columnView.subscribe(columnModel);
    columnModel.subscribe(columnView);

    await boardView.render(boardList);
    columnView.init();
})()