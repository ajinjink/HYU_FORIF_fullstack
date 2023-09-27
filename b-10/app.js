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
    const storedRestaurants = JSON.parse(fileData); // 파일 읽어서

    for (const restaurant of storedRestaurants) {
        if (restaurant.id === restaurantID) { // id에 해당하는 레스토랑 찾으면
        return res.render('restaurant-detail', {restaurant: restaurant}); // 전달
        }
    }
});

app.get('/recommend', function(req, res) {
    res.render('recommend');
});

app.post('/recommend', function(req, res) {
    const restaurant = req.body;
    restaurant.id = uuid.v4(); // id 속성 생성, 고유한 키 부여
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