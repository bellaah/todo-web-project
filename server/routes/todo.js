var express = require('express');
var router = express.Router();
const board = require('../models/todo');

router.get('/remove', (req, res, next) => {
    board.removeCard(req.body.cardId);
    res.send(true);
});

router.get('/updateColumnName', (req, res, next) => {
    let column = req.body;
    board.updateColumnName(column.id,column.newName);
    res.send(true);
});

router.get('/updateCard', (req, res, next) => {
    let card = req.body;
    board.updateCardContent(card.cardId,card.content,card.file);
    res.send(true);
});

router.get('/addCard', async(req, res, next) => {
    await board.addCard(req.body);
    res.send(true);
});

router.get('/moveCard', async(req, res, next) => {
    await board.changeCardStatus(req.body.cardId,
        req.body.newColumnId,req.body.prevCardIndex); 
    res.send(true);
});

router.get('/:userId', async(req, res, next) => {
    res.render('board',{userId :req.params.userId});
});

router.post('/getBoard', async(req, res, next) => {
    let todoList = await board.getTodoList(req.body.userId);
    res.send(todoList);
});

module.exports = router;
