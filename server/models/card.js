const cardModel = (obj) => ({
    content: obj.CARD_CONTENT,
    file: obj.CARD_EXTRA_FILE,
    writer: obj.CARD_WRITER_ID,
    id: obj.CARD_ID,
    listId: obj.LIST_ID
});
  
module.exports = cardModel;