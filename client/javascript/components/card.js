class card{
    render(card){
        return `
            <div class="card" data-order-index="${card.ORDER_INDEX}" data-card-id="${card.CARD_ID}" data-columns="${card.LIST_ID}">
                <span class="glyphicon glyphicon-align-left" aria-hidden="true"></span>
                <div class="card-center">
                    <span class="card-center-content">${card.CARD_CONTENT}</span>
                    <span class="card-center-wrtier">added by ${card.CARD_WRITER_ID}</span>
                </div>
                <button class="card-delete-btn">x</button>
            </div>`;
    }
}

export default card;