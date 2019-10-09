import Board from '../components/board.js';

class boardModel{
    async init(){
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

        let board = new Board();
        await board.render(boardList);
        return;
    }
}

export default boardModel;