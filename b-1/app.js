const path = require('path');

const express = require('express');

const app = express();

app.get('/', function(req, res) { // index.html
    const htmlFilePath = path.join(__dirname, 'views', 'index.html'); 
    res.sendFile(htmlFilePath);
});

app.get('/restaurants', function(req, res) {
    const htmlFilePath = path.join(__dirname, 'views', 'restaurants.html');
    res.sendFile(htmlFilePath); // 파일 경로
    // sendFile은 파일을 조사하여 해당 파일에 html 파일이 포함되어 있는지 확인하고, 브라우저가 자동으로 html 파일을 반환
});

app.get('/recommend', function(req, res) {
    const htmlFilePath = path.join(__dirname, 'views', 'recommend.html');
    res.sendFile(htmlFilePath);
});

app.get('/confirm', function(req, res) {
    const htmlFilePath = path.join(__dirname, 'views', 'confirm.html');
    res.sendFile(htmlFilePath);
});

app.get('/about', function(req, res) {
    const htmlFilePath = path.join(__dirname, 'views', 'about.html');
    res.sendFile(htmlFilePath);
});

// 경로 생성해주고 html 파일에서 다른 html 파일로 이동하는 링크 다 변경
// 일대일 대치 (about.html -> /about, index.html -> /)
// 해당 파일명이 들어가는 자리에, 대응되는 경로 넣으면 됨

app.listen(3000);