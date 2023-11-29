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

router.get('/posts/:id/edit', async function(req, res) { // 수정 페이지로 넘어감
    const query = `
    select * from posts
    where id = ?
    `;
    const [posts] = await db.query(query, [req.params.id]); // 기존 게시글 내용 모두 불러옴

    if (!posts || posts.length === 0) { 
        return res.status(404).render('404');
    }

    res.render('update-post', {post: posts[0]}); // 입력 창에 기존 내용 게시 (so that you can change it)
});

router.post('/posts/:id/edit', async function(req, res) { // 수정 후 제출한 요청 핸들러
    const query = `
        update posts
        set title = ?, summary = ?, body = ?
        where id = ?
    `;

    await db.query(query, [ // 수정 된 글 받아와서 디비에 업데이트
        req.body.title,
        req.body.summary,
        req.body.content,
        req.params.id
    ]);

    res.redirect('/posts');
});

router.post('/posts/:id/delete', async function(req, res) {
    await db.query('delete from posts where id = ?', [req.params.id]); // 삭제
    res.redirect('/posts');
});

module.exports = router;