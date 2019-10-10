const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');
const user = require('../models/users');

let board = new Todo();

router.get('/:userId', async(req, res, next) => {
    res.render('board',{userId :req.params.userId});
});

router.post('/deleteCard', (req, res, next) => {
    board.removeCard(req.body);
    res.send(true);
});

router.post('/updateColumnName', (req, res, next) => {
    let column = req.body;
    board.updateColumnName(column.id,column.newName);
    res.send(true);
});

router.post('/updateCard', (req, res, next) => {
    let card = req.body;
    board.updateCardContent(card.cardId,card.content,card.file);
    res.send(true);
});

router.post('/addCard', async(req, res, next) => {
    let card = await board.addCard(req.body);
    res.send(card);
});

router.post('/moveCard', async(req, res, next) => {
    await board.changeCardStatus(req.body.cardId,
        req.body.newColumnId,req.body.prevCardIndex); 
    res.send(true);
});

router.post('/getBoard', async(req, res, next) => {
    if(user.getUserId(req.body.userId)){
        let todoList = await board.getTodoList(req.body.userId);
        res.send(todoList);
    }else{
        res.redirect('/');
    }
});

module.exports = router;
