const fs = require('fs'); // 내장 패키지
const path = require('path');

const express = require('express'); // 타사 패키지
const uuid = require('uuid');

const resData = require('./util/restaurant-data'); // js 파일

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/restaurants', function(req, res) {

    const storedRestaurants = resData.getStoredRestaurants();

    res.render('restaurants', {restaurantNum: storedRestaurants.length, restaurants: storedRestaurants});
});

app.get('/restaurants/:id', function(req, res) {
    const restaurantID = req.params.id;

    const storedRestaurants = resData.getStoredRestaurants();

    for (const restaurant of storedRestaurants) {
        if (restaurant.id === restaurantID) {
        return res.render('restaurant-detail', {restaurant: restaurant});
        } 
    }

    res.render('404');
});

app.get('/recommend', function(req, res) {
    res.render('recommend');
});

app.post('/recommend', function(req, res) {
    const restaurant = req.body;
    restaurant.id = uuid.v4();
    
    const storedRestaurants = resData.getStoredRestaurants();

    storedRestaurants.push(restaurant);

    resData.storeRestaurants(storedRestaurants);

    res.redirect('/confirm');
}); 

app.get('/confirm', function(req, res) {
    res.render('confirm');
});

app.get('/about', function(req, res) {
    res.render('about');
});

app.use(function(req, res) {
    res.render('404');
});

app.use(function(error, req, res, next) { 
    res.render('500');
});

app.listen(3000);