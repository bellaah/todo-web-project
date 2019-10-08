class card{
    render(obj){
        return `
            <div class="card" id="order-index-${obj.ORDER_INDEX}">
                <span class="glyphicon glyphicon-align-left" aria-hidden="true"></span>
                <div class="card-center">
                    <span class="card-center-content">${obj.CARD_CONTENT}</span>
                    <span class="card-center-wrtier">added by ${obj.CARD_WRITER_ID}</span>
                </div>
                <button class="card-menu-btn">x</button>
            </div>`;
    }
}

export default card;