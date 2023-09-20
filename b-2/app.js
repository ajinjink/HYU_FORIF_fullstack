const path = require('path');

const express = require('express');

const app = express();

app.use(express.static('public'));
// 미들웨어
// 익스프레스는 함수지만, 자바스크립트에서 함수는 실제로 내부에선 객체이기 때문에 객체와 유사한 속성을 갖음
// static : request handler를 설정해서 정적 파일에 대한 요청인지, 해달 파일을 전달할 수 있는지 확인하는 모든 수신 요청에 대해 실행됨
// 매개변수로 정적 파일이 들어있는 폴더의 이름
// 모든 수신 요청에 대해 public 폴더에서 찾을 수 있는 파일에 대한 요청인지 확인해야 한다고 익스프레스에 알려줘야 함
// 그렇다면 파일이 응답으로 반환
// 아니라면 요청이 다른 경로로 전달. 그 경로도 없으면 요청 실패

app.get('/', function(req, res) {
    const htmlFilePath = path.join(__dirname, 'views', 'index.html');
    res.sendFile(htmlFilePath);
});

app.get('/restaurants', function(req, res) {
    const htmlFilePath = path.join(__dirname, 'views', 'restaurants.html');
    res.sendFile(htmlFilePath);
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

app.listen(3000);