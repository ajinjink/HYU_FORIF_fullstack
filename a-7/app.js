const fs = require('fs'); // file system
const path = require("path");
// 보통은 노드js 내장 패키지를 타사 패키지보다 먼저 불러옴
const express = require('express');

const app = express();

app.use(express.urlencoded({extended: false})); 

app.get('/', function(req, res) {
    res.send("<form action='/store-user' method='POST'><label>Name</label><input type='text' name='username'><button>submit</button></form>");
});

app.post('/store-user', function(req, res) {
    const userName = req.body.username;

    const filePath = path.join(__dirname, 'data', 'users.json'); // 데이터를 저장할 파일로의 경로
    // __dirname : 이 프로젝트 디렉토리에 대한 절대 경로
    // 폴더명, 파일명 전달

    const fileData = fs.readFileSync(filePath); // 설정한 파일에서 데이터 읽어오자
    // js 객체가 아니라 text raw data
    const existingUsers = JSON.parse(fileData);
    // 방금 읽어온 데이터는 json 형식이다. js 객체로 변환 (parse)

    existingUsers.push(userName); // 방금 읽어온 데이터에 새로 받아온 데이터 추가

    fs.writeFileSync(filePath, JSON.stringify(existingUsers));
    // fileSync를 사용해야 우리가 원하는 작업을 즉시 수행
    // 다시 파일에 데이터를 쓰는데, js 객체가 아닌 텍스트 형식으로 넣어줘야 한다 (stringify)
    res.send("<h1>Username stored!</h1>");
});

app.listen(3000);
