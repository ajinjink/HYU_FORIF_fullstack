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
    `; 
    const [posts] = await db.query(query);

    res.render('posts-list', {posts : posts});
});

router.get('/new-post', async function(req, res) {
    const [authors] = await db.query('select * from authors');
    res.render('create-post', {authors: authors});
});

router.post('/posts', async function(req, res) {
    const data = [
        req.body.title,
        req.body.summary,
        req.body.content,
        req.body.author,
    ]
    await db.query('insert into posts (title, summary, body, author_id) values (?)', [data]);

    res.redirect('/posts');
});

router.get('/posts/:id', async function (req, res) {
    const query = `
        select posts.*, authors.name as author_name, authors.email as author_email
        from posts
        inner join authors on posts.author_id = authors.id
        where posts.id = ?
    `;
    const [posts] = await db.query(query, [req.params.id]);

    if (!posts || posts.length === 0) { // 일치하는 게시글 없음
        return res.status(404).render('404');
    }

    const postData = {
        ...posts[0], // posts[0]의 모든 속성 복사, 분해 후 나열
        date: posts[0].date.toISOString(), // 기계를 위한 시간
        human_date: posts[0].date.toLocaleDateString('ko-KR', { // 인간들이 볼 시간
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    res.render('post-detail', {post: postData});
});

module.exports = router;