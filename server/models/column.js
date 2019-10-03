const columnModel = (obj) => ({
    title: obj.CARD_TITLE,
    content: obj.CARD_CONTENT,
    file: obj.CARD_EXTRA_FILE,
    writer: obj.CARD_WRITER_ID
});
  
module.exports = columnModel;