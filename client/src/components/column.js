import Card from './card.js';

class column {
    render = async(columnId,obj) => {
        let cardHtml = await this.makeCard(obj.card,columnId);
        let html = `
            <div class="column" id="column-${columnId}">
                <div class="column-head">
                    <span class="card-count-btn">${obj.card.length}</span>
                    <span class="column-name">${obj.name}</span>
                    <button class="add-card-btn">+</button>
                    <button class="column-menu-btn">...</button>
                </div>
                ${cardHtml}
            </div>`;
        return html; 
    }

    makeCard = (cardList) =>{
        let cardHtml = "";
        let card = new Card();
        cardList.forEach(elem => {
            cardHtml += card.render(elem);
        });
        return cardHtml;
    }
}


export default column;