const express = require('express');

const db = require('../data/database');
const router = express.Router();

router.get('/', function(req, res) {
    res.redirect('/posts');
});

router.get('/posts', function(req, res) {
    res.render('posts-list');
});

router.get('/new-post', async function(req, res) {
    const [authors] = await db.query('select * from authors');
    res.render('create-post', {authors: authors});
});

router.post('/posts', async function(req, res) {
    const data = [ // 사용자가 입력한 양식에서 
        req.body.title, // form의 name으로 추출
        req.body.summary,
        req.body.content,
        req.body.author,
    ]
    await db.query('insert into posts (title, summary, body, author_id) values (?)', [data]);
    // 데이터베이스에 데이터 삽입

    res.redirect('/posts');
});

module.exports = router;