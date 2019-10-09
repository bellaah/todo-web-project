import {$,$$,findInParentX2,findInParent} from '../src/util.js';

class columnModel{
    init(){
        const columnList = $$(".column");
        const textAreaTag = $$("textarea");

        this.registerEvent(columnList,"click",this.clickEvent);
        this.registerEvent(textAreaTag,"input",this.inputEvent);
    }

    registerEvent(list,event,func){
        list.forEach(elem => {
            elem.addEventListener(event,(evt) => func.bind(this)(evt));
        });
    }

    clickEvent(evt){
        if(evt.target.className === "add-card-btn") {
            this.clickPlusBtn(evt.target);
        }else if(evt.target.className === "add-cancel-btn"){
            this.clickCancelBtn(evt.target);
        }
    }

    inputEvent(evt){
        let isEmpty = textArea.value == "" ? true : false;
        this.enterText(evt.target,isEmpty);
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

}


export default columnModel;