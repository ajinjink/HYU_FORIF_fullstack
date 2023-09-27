const express = require('express'); // 현재 파일에서 사용하는 패키지들 불러오기
const uuid = require('uuid');

const resData = require('../util/restaurant-data');

// const app = express(); 는 앱에서 단 한 번 발생해야 한다 (app.js에서)
const router = express.Router();

router.get('/restaurants', function(req, res) {

    const storedRestaurants = resData.getStoredRestaurants();

    res.render('restaurants', {restaurantNum: storedRestaurants.length, restaurants: storedRestaurants});
});

router.get('/restaurants/:id', function(req, res) {
    const restaurantID = req.params.id;

    const storedRestaurants = resData.getStoredRestaurants();

    for (const restaurant of storedRestaurants) {
        if (restaurant.id === restaurantID) {
        return res.render('restaurant-detail', {restaurant: restaurant});
        } 
    }

    res.render('404');
});

router.get('/recommend', function(req, res) {
    res.render('recommend');
});

router.post('/recommend', function(req, res) {
    const restaurant = req.body;
    restaurant.id = uuid.v4();
    
    const storedRestaurants = resData.getStoredRestaurants();

    storedRestaurants.push(restaurant);

    resData.storeRestaurants(storedRestaurants);

    res.redirect('/confirm');
}); 

router.get('/confirm', function(req, res) {
    res.render('confirm');
});

module.exports = router;