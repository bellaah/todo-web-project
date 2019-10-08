import Card from './card.js';

class column {
    async render(columnId,obj){
        let cardHtml = await this.makeCard(obj.card,columnId);
        let html = `
            <div class="column" id="column-${columnId}">
                <div class="column-head">
                    <span class="card-count-btn">${obj.card.length}</span>
                    <span class="column-name">${obj.name}</span>
                    <button class="add-card-btn">+</button>
                    <button class="column-menu-btn">...</button>
                </div>
                <div class="add-card-div">
                    <textarea name="content" data-input-max-length="500" placeholder="Enter a note"></textarea>
                    <div class="add-card-btn-div">
                        <button class="add-card-btn">Add</button>
                        <button class="add-cancel-btn">Cancel</button>
                    </div>
                </div>
                ${cardHtml}
            </div>`;
        return html; 
    }

    makeCard(cardList){
        let cardHtml = "";
        let card = new Card();
        cardList.forEach(elem => {
            cardHtml += card.render(elem);
        });
        return cardHtml;
    }
}


export default column;