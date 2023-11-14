const express = require('express');

const db = require('../data/database');
const router = express.Router();

router.get('/', function(req, res) {
    res.redirect('/posts');
});

router.get('/posts', async function(req, res) {
    const query = `
    select posts.*, authors.name as author_name 
    from posts inner join authors on posts.author_id = authors.id
    `; // posts의 모든 행, authors의 name 행
    const [posts] = await db.query(query);

    res.render('posts-list', {posts : posts});
});

router.get('/new-post', async function(req, res) {
    const [authors] = await db.query('select * from authors');
    res.render('create-post', {authors: authors});
});

router.post('/posts', async function(req, res) {
    const data = [
        req.body.title, // form의 name으로 추출
        req.body.summary,
        req.body.content,
        req.body.author,
    ]
    await db.query('insert into posts (title, summary, body, author_id) values (?)', [data]);

    res.redirect('/posts');
});

module.exports = router;