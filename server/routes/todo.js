var express = require('express');
var router = express.Router();
const board = require('../database/todoTable');
var multer = require('multer');

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'client/static_root/');
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    }),
});

router.get('/remove', (req, res, next) => {
    board.removeCard(req.body.cardId);
    res.send(true);
});

router.get('/updateColumnName', (req, res, next) => {
    let column = req.body;
    board.updateColumn(column.id,column.newName);
    res.send(true);
});

router.get('/updateCard', (req, res, next) => {
    let card = req.body;
    board.updateCard(card.cardId,card.content,card.file);
    res.send(true);
});

router.get('/addCard', async(req, res, next) => {
    await board.addCard(req.body);
    res.send(true);
});

router.get('/:userId', async(req, res, next) => {
    let todoList = await board.getTodoList(req.params.userId);
    res.send(todoList);
});



module.exports = router;
