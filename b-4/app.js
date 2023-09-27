const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'views'));
// 익스프레스에게 어디서 템플릿 파일을 찾을지 알려줌
// views : view engine 옵션 설정과 연관된 예약어
app.set('view engine', 'ejs'); // view engine 을 사용할 것이라는 것, 그 엔진의 이름이 ejs 라는 것
// set : 익스프레스 앱에 대한 특정 옵션을 설정할 수 있는 메서드
// view engine : html 파일로 보내기 전에 템플릿 엔진을 사용한다는 것을 익스프레스에게 알려줌

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.get('/', function(req, res) { 
    // const htmlFilePath = path.join(__dirname, 'views', 'index.html');
    // res.sendFile(htmlFilePath);
    res.render('index');
    // 렌더링 : 이 응답 객체어서 사용할 수 있는 메서드
    // 템플릿 엔진을 사용해서 파일을 만들고 HTML 로 변환하여 브라우저로 다시 전송
    // 템플릿 엔진을 뷰 엔진으로 등록했기 때문에 사용 가능
    // 렌더링은 이 뷰 폴더에서 찾을 수 있는 템플릿 파일을 전달하기 위해서 ejs를 사용해야 함을 알게 됨
    // 그런 다음 응답으로 또는 해당 전달의 결과로 일부 html 내용을 가져오고 생성된 html 내용을 응답으로 다시 보내야 함
});

app.get('/restaurants', function(req, res) {
    // const htmlFilePath = path.join(__dirname, 'views', 'restaurants.html');
    // res.sendFile(htmlFilePath);
    res.render('restaurants');
});

app.get('/recommend', function(req, res) {
    // const htmlFilePath = path.join(__dirname, 'views', 'recommend.html');
    // res.sendFile(htmlFilePath);
    res.render('recommend');
});

app.post('/recommend', function(req, res) {
    const restaurant = req.body;
    const filePath = path.join(__dirname, 'data', 'restaurants.json');

    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    storedRestaurants.push(restaurant);

    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

    res.redirect('/confirm');
}); 

app.get('/confirm', function(req, res) {
    // const htmlFilePath = path.join(__dirname, 'views', 'confirm.html');
    // res.sendFile(htmlFilePath);
    res.render('confirm');
});

app.get('/about', function(req, res) {
    // const htmlFilePath = path.join(__dirname, 'views', 'about.html');
    // res.sendFile(htmlFilePath);
    res.render('about');
});

app.listen(3000);