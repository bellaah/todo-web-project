import Card from './card.js';
import observable from '../src/observable.js';
import {$} from '../src/util.js';

class column extends observable{
    constructor(){
        super();
        this.card = new Card();
    }

    async render(columnId,obj){
        let cardHtml = await this.makeCard(obj.card,columnId);
        let html = `
            <div class="column column-id-${columnId}" data-columns="${columnId}">
                <div class="column-head">
                    <span class="card-count-btn">${obj.card.length}</span>
                    <span class="column-name">${obj.name}</span>
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

    async update(state) {
        if(state.type === "delete"){
            $(`.card-id-${state.cardId}`).remove();
        }else{
            const curColumn = $(`.column-id-${state.LIST_ID}`);
            let cardHtml = await this.card.render(state);
            curColumn.insertAdjacentHTML('beforeend',cardHtml);
        }
    }
}

export default column;