const express = require('express');
const router = express.Router();

//Обьявляем константу path, которая используетсяя для создания абсолютного пути из относительного
const path = require('path');

router.get('/router1', (req, res) => {
    res.sendFile(path.resolve('client/html/router1.html'));
});

router.get('/router2', (req, res) => {
    res.sendFile(path.resolve('client/html/router2.html'));
});

module.exports = router;