import BoardModel from './models/boardModel.js';
import ColumnModel from './models/columnModel.js';
import ColumnView from './components/column.js';

const getBoardData = async() => {
    let url = window.location.href.split('/');
    let boardList = await fetch('/todo/getBoard', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId : url[url.length-1] })
    })
    .then(res => res.json());
    return boardList;
}

(async() => {
    const boardModel = new BoardModel();
    const columnModel = new ColumnModel();
    const columnView = new ColumnView();
    const boardList = await getBoardData();

    columnView.subscribe(columnModel);
    columnModel.subscribe(columnView);

    await boardModel.init(boardList);
    columnModel.init();
})()