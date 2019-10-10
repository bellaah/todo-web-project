import Column from './column.js';
import {$,$$} from '../src/util.js';

class board{
    async render(boardList){
        let board = $(".board");

        let column = new Column();
        for (let columnId in boardList) {
            let html = await column.render(columnId,boardList[columnId]);
            await board.insertAdjacentHTML('beforeend',html);
        }
        this.dragEventListener();
    }

    dragEventListener(){
        let cardList = $$(".card");
        let columnList = $$(".column");
        let targetID;

        cardList.forEach(card => {
            card.addEventListener("dragstart", (event) => {
                targetID = this.dragStartEvent(event);
            });

            document.addEventListener("dragenter", (event) => {
                this.dragEnterEvent(event,targetID);
            });
        });

        columnList.forEach(column => {
            column.addEventListener("dragover", (event) => {
                event.preventDefault();
            });
        
            column.addEventListener("drop", (event) => {
                this.dropEvent(event,targetID);
            });
        });
    }

    dragStartEvent(event){
        event.target.classList.add("disable");
        event.dataTransfer.dropEffect = "copy";
        return event.target.id;
    }

    dragEnterEvent(event,targetID){
        if( event.target.className == "column" ) {
            event.target.insertAdjacentElement('beforeend', $(`#${targetID}`));
        }else if( event.target.className == "card" ){
            event.target.insertAdjacentElement('beforebegin', $(`#${targetID}`));
        }
    }

    dropEvent(event,targetID){
        event.preventDefault();
        console.log(event.target);
        let data = targetID;
        let card = document.querySelector(`#${data}`);
        card.classList.remove("disable");
    }

}

export default board;