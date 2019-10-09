import Card from './card.js';

class column {
    async render(columnId,obj){
        let cardHtml = await this.makeCard(obj.card,columnId);
        let html = `
            <div class="column" data-columns="${columnId}">
                <div class="column-head">
                    <span class="card-count-btn">${obj.card.length}</span>
                    <span class="column-name">${obj.name}</span>
                    <button class="add-card-btn" data-columns="${columnId}">+</button>
                    <button class="column-menu-btn" data-columns="${columnId}">...</button>
                </div>
                <div class="add-card-div hidden column-id-${columnId}" data-columns="${columnId}">
                    <textarea name="content" data-input-max-length="500" placeholder="Enter a note"></textarea>
                    <div class="add-card-btn-div">
                        <button class="add-card-green-btn" data-columns="${columnId}">Add</button>
                        <button class="add-cancel-btn" data-columns="${columnId}">Cancel</button>
                    </div>
                </div>
                ${cardHtml}
            </div>`;
        return html; 
    }

    makeCard(cardList){
        let card = new Card();
        let cardHtml = cardList.reduce((pre, cur) => pre + card.render(cur), '');
        return cardHtml;
    }
}

export default column;