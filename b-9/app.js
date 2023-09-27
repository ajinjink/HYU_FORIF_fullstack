const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/restaurants', function(req, res) {
    const filePath = path.join(__dirname, 'data', 'restaurants.json');

    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    res.render('restaurants', {restaurantNum: storedRestaurants.length, restaurants: storedRestaurants});
});

app.get('/restaurants/:id', function(req, res) { // 고유 식별자가 붙은 경로
    const restaurantID = req.params.id; // 고유 식별자 추출
    res.render('restaurant-detail', {rid: restaurantID});
});
// 다른 경로들은 다 도메인 바로 뒤에 붙는데, /:id 는 /restaurants 뒤에 붙는 중첩 경로
// styles 파일을 도메인이 아니라 /restaurants 폴더에서 찾으려 할 것이기 때문에
// styles, scipts 를 요청하는 모든 경로를 절대 경로로 변경해주자.

app.get('/recommend', function(req, res) {
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
    res.render('confirm');
});

app.get('/about', function(req, res) {
    res.render('about');
});

app.listen(3000);