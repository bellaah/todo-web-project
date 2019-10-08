class card{
    render(obj){
         console.log(obj);
        return `
            <div class="card" id="order-index-${obj.ORDER_INDEX}">
                <span class="card-icon"></span>
                <div class="card-center">
                    <span class="card-center-content">${obj.CARD_CONTENT}</span>
                    <span class="card-center-wrtier">${obj.CARD_WRITER_ID}</span>
                </div>
                <button class="card-menu-btn">...</button>
            </div>`;
    }
}

export default card;