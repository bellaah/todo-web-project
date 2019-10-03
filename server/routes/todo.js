var express = require('express');
var router = express.Router();
const board = require('../database/todoTable');

router.get('/remove', (req, res, next) => {
    board.removeCard(req.body.cardId);
    res.send(true);
});

router.get('/updateColumn', (req, res, next) => {
    let column = req.body;
    board.updateColumn(column.cardId,column.newName);
    res.send(true);
});

router.get('/:userId', async(req, res, next) => {
    let todoList = await board.getTodoList(req.params.userId);
    res.send(todoList);
});

router.get('/updateCard', async(req, res, next) => {
    let card = req.body;
    let todoList = await board.updateCard(card.cardId,card.content,card.file);
    res.send(todoList);
});

module.exports = router;
