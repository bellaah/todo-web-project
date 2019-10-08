import Column from './column.js';

let board = document.querySelector(".board");
let url = window.location.href.split('/');

(async() => {
    let boardList = await fetch('/todo/getBoard', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId : url[url.length-1] })
    }).then(res => res.json());

    let column = new Column();
    for (let columnId in boardList) {
        let html = await column.render(columnId,boardList[columnId]);
        board.insertAdjacentHTML('beforeend',html);
    }
})()

