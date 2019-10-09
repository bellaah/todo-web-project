import {$,$$,findInParentX2,findInParent} from '../src/util.js';
import observable from '../src/observable.js';

class columnModel extends observable{
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
        switch(evtTarget.className.split(" ")[0]){
            case "add-card-btn":
                this.clickPlusBtn(evtTarget); break;
            case "add-cancel-btn":
                this.clickCancelBtn(evtTarget); break;
            case "add-card-green-btn":
                let content = findInParentX2(evtTarget,"textarea");
                let listId = evtTarget.dataset.columns;
                let card = await this.addCard(content.value,listId);
                card.type = "add";
                this.changeState(card); 
                content.value = ""; break;
            case "card-delete-btn":
                let data = evtTarget.parentNode.dataset
                let [cardId,orderIndex,columnId] = [data.cardId,data.orderIndex,data.columns];
                this.deleteCard(cardId,orderIndex,columnId);
                this.changeState({ type : "delete" , cardId}); break;
        }
    }

    inputEvent(evtTarget){
        let isEmpty = evtTarget.value == "" ? true : false;
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

    async addCard(content,listId){
        let cardId = await fetch('/todo/addCard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode:"cors",
            body: JSON.stringify({ content, listId })
        })
        .then(res => res.json());
        return cardId;
    }

    deleteCard(cardId,orderIndex,columnId){
        fetch('/todo/deleteCard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode:"cors",
            body: JSON.stringify({ cardId,orderIndex,columnId })
        });
    }

}


export default columnModel;