const express = require('express');

const db = require('../data/database'); // 생성한 데이터베이스 링크 풀

const router = express.Router();

router.get('/', function(req, res) {
    res.redirect('/posts');
});

router.get('/posts', function(req, res) {
    res.render('posts-list');
});

router.get('/new-post', async function(req, res) {
    const [authors] = await db.query('select * from authors'); // 쿼리 반환 결과는 배열
    // 데이터베이스 쿼리로 가져온 결과의 첫 번째 요소는 쿼리 결과 정보, 두 번쩨 요소는 결과에 대한 메타데이터
    // 우리는 쿼리의 결과만 가져오고 싶기 때문에 배열의 첫 번째 요소만 추출, authors라는 이름으로 저장 -> [authors]
    res.render('create-post', {authors: authors});
});
// 데이터베이스 접근은 오래 걸린다
// mysql2는 프로미스 지원

module.exports = router;