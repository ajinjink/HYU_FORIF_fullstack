const fs = require('fs');
const path = require('path');

const express = require('express');
const uuid = require('uuid');

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

app.get('/restaurants/:id', function(req, res) {
    const restaurantID = req.params.id;

    const filePath = path.join(__dirname, 'data', 'restaurants.json');
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    for (const restaurant of storedRestaurants) {
        if (restaurant.id === restaurantID) { // 레스토랑을 찾으면
        return res.render('restaurant-detail', {restaurant: restaurant});
        } // 레스토랑 객체 전달
    }

    // 레스토랑을 끝까지 찾지 못하면
    res.status(404).render('404');
});

app.get('/recommend', function(req, res) {
    res.render('recommend');
});

app.post('/recommend', function(req, res) {
    const restaurant = req.body;
    restaurant.id = uuid.v4();
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

// 위의 핸들러들을 거치면서 필터링 되지 못한 요청들은 마지막 use에서 잡힘
app.use(function(req, res) {
    res.status(404).render('404');
});

app.use(function(error, req, res, next) { // 서버 측 에러
    res.status(500).render('500');
});

app.listen(3000);