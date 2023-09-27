const express = require('express');
// const app = express(); 는 앱에서 단 한 번 발생해야 한다 (app.js에서)
const router = express.Router();

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/about', function(req, res) {
    res.render('about');
});

module.exports = router;
// router 자체가 객체