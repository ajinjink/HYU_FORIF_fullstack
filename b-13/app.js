// const fs = require('fs'); // 다른 파일로 이동
const path = require('path');

const express = require('express');
// const uuid = require('uuid'); // 다른 파일로 이동

// const resData = require('./util/restaurant-data'); // 다른 파일로 이동
const defaultRoutes = require('./routes/default'); // 외부 파일 불러오기
const restaurantRoutes = require('./routes/restaurants');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.use('/', defaultRoutes);
// '/'로 시작하는 모든 경로는 defaultRoutes가 핸들할 것임
// get, post에 지정된 경로는 정확히 그 경로일 때만 핸들하는데, use 미들웨어는 경로의 시작이 일치하는지만 확인
// 따라서, 모든 요청은 defaultRoutes를 한 번 거칠 것
// 일치하면 핸들러에서 응답 보낼 것
// 일치하지 않으면 app.js로 돌아와서 아래 코드 수행

app.use('/', restaurantRoutes);
// defaultRoutes에서 필터링이 되지 않은 모든 요청을 잡아서 확인
// 만약 app.use('/restaurants', restaurantRoutes);와 같이 '/restaurants'라는 경로를 매개변수로 주면
// 모든 경로 앞에 '/restaurants'가 있다고 여김
// localhost:3000/restaurants/recommend 인 경우에 핸들러가 요청을 받게 됨

app.use(function(req, res) {
    res.render('404');
});

app.use(function(error, req, res, next) { 
    res.render('500');
});

app.listen(3000);