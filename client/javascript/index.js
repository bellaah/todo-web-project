import BoardModel from './models/boardModel.js';
import ColumnModel from './models/columnModel.js';

const init = async() => {
    const boardModel = new BoardModel();
    const columnModel = new ColumnModel();
    const boardList = await getBoardData();

    await boardModel.init(boardList);
    columnModel.init();
}

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

init();