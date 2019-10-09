import {$,$$} from './util.js';

class columnModel{
    registerEventListener(){
        let columnList = $$(".column");
        columnList.forEach(column => {
            column.addEventListener("click",(evt)=>{
                if(evt.target.className === "add-card-btn") {
                    this.clickPlusButton(evt.target);
                }
            });
        });
    }

    clickPlusButton(evtTarget){
        let curAddCardDiv = $(`.column-id-${evtTarget.dataset.columns}`);
        let removeClassName = curAddCardDiv.classList.contains("hidden") ? "hidden" : "visible";
        let addClassName = removeClassName === "hidden" ? "visible" : "hidden";
        curAddCardDiv.classList.remove(removeClassName);
        curAddCardDiv.classList.add(addClassName);
    }

}


export default columnModel;