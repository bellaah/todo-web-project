var express = require('express');
var router = express.Router();
const board = require('../database/todoTable');

router.get('/remove', (req, res, next) => {
    board.removeCard(req.body.cardId);
    res.send(true);
});

router.get('/updateColumn', (req, res, next) => {
    board.updateColumn(req.body.cardId,req.body.newName);
    res.send(true);
});

router.get('/:userId', async(req, res, next) => {
    console.log(await board.getTodoList(req.params.userId));
    res.send(true);
});

module.exports = router;
