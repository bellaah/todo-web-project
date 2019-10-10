import observable from '../src/observable.js';
import Column from './column.js';
import {$,$$} from '../src/util.js';

class board extends observable{
    async render(boardList){
        const board = $(".board");

        let column = new Column();
        for (let columnId in boardList) {
            let html = await column.render(columnId,boardList[columnId]);
            board.insertAdjacentHTML('beforeend',html);
        }
        this.dragEventListener();
    }

    dragEventListener(){
        const cardList = $$(".card");
        const columnList = $$(".column");
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
                this.dropEvent(event,column,targetID);
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
            return;
        }else if( event.target.className == "card" ){
            event.target.insertAdjacentElement('beforebegin', $(`#${targetID}`));
            return;
        }
    }

    async dropEvent(event,column,targetID){
        event.preventDefault();
        const card = document.querySelector(`#${targetID}`);
        card.classList.remove("disable");
        let prevElement = card.previousElementSibling;

        let cardData = {
            prevCardIndex : prevElement.classList.contains("add-card-div") ? -1 : prevElement.dataset.orderIndex,
            cardId : card.dataset.cardId,
            newColumnId : column.dataset.columns
        };

        this.updateCardCount(cardData.newColumnId,true);
        this.updateCardCount(card.dataset.columns,false);

        card.dataset.columns = cardData.newColumnId;
        this.changeState("move",cardData); 
    }

    async updateCardCount(columnNumber,isPlus){
        const column = $(`#column-${columnNumber}`);
        const count = column.querySelector(".card-count-btn");
        count.innerText = parseInt(count.innerText) + ( isPlus ? 1 : -1 );
    }

}

export default board;