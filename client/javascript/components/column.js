import Card from './card.js';
import observable from '../src/observable.js';
import Board from './board.js';
import {$,$$,findInParentX2,findInParent} from '../src/util.js';

class column extends observable{
    constructor(){
        super();
        this.card = new Card();
        this.board = new Board();
    }

    async update(type,data){
        if(type === "addCard"){
            const curColumn = $(`#column-${data.LIST_ID}`);
            let cardHtml = await this.card.render(data);
            const count = curColumn.querySelector(".card-count-btn");
            count.innerText = parseInt(count.innerText)+1;
            await curColumn.insertAdjacentHTML('beforeend',cardHtml);
            // this.board.dragEventListener([$(`#card-${data.CARD_ID}`)]);
            $(`#card-${data.CARD_ID}`).addEventListener("dragstart", (event) => {
                event.dataTransfer.setData("text/plain", event.target.id);
                event.target.classList.add("disable");
                event.dataTransfer.dropEffect = "copy";
            });
        }
    }

    init(){
        const columnList = $$(".column");
        const textAreaTag = $$("textarea");

        this.registerEvent(columnList,"click",this.clickEvent);
        this.registerEvent(textAreaTag,"input",this.inputEvent);
    }

    registerEvent(list,event,func){
        list.forEach(elem => {
            elem.addEventListener(event,(evt) => func.bind(this)(evt.target) );
        });
    }

    async clickEvent(evtTarget){
        const firstClassName = evtTarget.className.split(" ")[0];
        switch(firstClassName){
            case "add-card-btn":
                this.clickPlusBtn(evtTarget); break;
            case "add-cancel-btn":
                this.clickCancelBtn(evtTarget); break;
            case "add-card-green-btn":
                this.addCard(evtTarget); break;
            case "card-delete-btn":
                this.deleteCard(evtTarget); break;
        }
    }

    deleteCard(evtTarget){
        const data = evtTarget.parentNode.dataset;
        const {cardId,orderIndex} = data;
        const columnId  = data.columns;
        this.changeState("deleteCard",{cardId, orderIndex, columnId}); 
        const card = $(`#card-${cardId}`);
        const count = card.parentNode.querySelector(".card-count-btn");
        count.innerText = parseInt(count.innerText)-1;
        card.remove();
    }

    addCard(evtTarget){
        let content = findInParentX2(evtTarget,"textarea");
        let listId = evtTarget.dataset.columns;
        this.changeState("addCard",{content : content.value, listId}); 
        content.value = ""; 
    }

    inputEvent(evtTarget){
        const isEmpty = !evtTarget.value;
        this.enterText(evtTarget,isEmpty);
    }

    clickPlusBtn(evtTarget){
        const addCardDiv = findInParentX2(evtTarget,".add-card-div");
        let [oldName, newName] = addCardDiv.classList.contains("hidden") ? 
                                ["hidden","visible"] : ["visible","hidden"];
        this.changeClassList(addCardDiv,oldName,newName);
    }

    clickCancelBtn(evtTarget){
        const addCardDiv = evtTarget.parentNode.parentNode;
        this.changeClassList(addCardDiv,"visible","hidden");
    }

    enterText(evtTarget,isEmpty){
        let greenBtn = findInParent(evtTarget,".add-card-green-btn");
        let [oldName, newName] =  isEmpty ? ["available","disable"] : ["disable","available"];
        this.changeClassList(greenBtn,oldName, newName);
    }

    changeClassList(target,oldName,newName){
        target.classList.remove(oldName);
        target.classList.add(newName);
    }

    async render(columnId,column){
        let cardHtml = await this.makeCard(column.card,columnId);
        let html = `
            <div class="column" id="column-${columnId}" data-columns="${columnId}" >
                <div class="column-head">
                    <span class="card-count-btn">${column.card.length}</span>
                    <span class="column-name">${column.name}</span>
                    <button class="add-card-btn" data-columns="${columnId}">+</button>
                    <button class="column-menu-btn" data-columns="${columnId}">...</button>
                </div>
                <div class="add-card-div hidden" data-columns="${columnId}">
                    <textarea name="content" maxlength="500" placeholder="Enter a note"></textarea>
                    <div class="add-card-btn-div">
                        <button class="add-card-green-btn disable" data-columns="${columnId}">Add</button>
                        <button class="add-cancel-btn" data-columns="${columnId}">Cancel</button>
                    </div>
                </div>
                ${cardHtml}
            </div>`;
        return html; 
    }

    makeCard(cardList){
        let cardHtml = cardList.reduce((pre, cur) => pre + this.card.render(cur), '');
        return cardHtml;
    }
}

export default column;