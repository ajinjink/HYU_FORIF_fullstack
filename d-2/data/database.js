const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost', // database server url
    database: 'blog_test', // 서버의 여러 데이터베이스 중에 어느 것?
    user: 'root', 
    password: 'PASSWORD'
});
// 개별 연결이 아니라 풀을 생성하면 여러 요청이 동시에 들어올때 더 효율적이다

module.exports = pool;