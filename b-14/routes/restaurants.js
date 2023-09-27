const express = require('express'); 
const uuid = require('uuid');

const resData = require('../util/restaurant-data');

const router = express.Router();

router.get('/restaurants', function(req, res) {
    let order = req.query.order;
    let nextOrder = 'desc';

    if (!(order === 'asc' || order === 'desc')) { // order가 둘 중 하나가 아니면 (없을 수도 있음)
        order = 'asc';
    }
    if (order === 'desc') nextOrder = 'asc'; // 다음 순서

    const storedRestaurants = resData.getStoredRestaurants();
    // 저장된 레스토랑을 바로 넘겨주는 게 아니라, 정렬하고 넘겨주자

    storedRestaurants.sort(function(A, B) { // 알파벳 순서로 정렬
        if (
            (order === 'asc' && A.name > B.name) || // 오름차순
            (order === 'desc' && A.name < B.name) // 내림차순
        ) return 1;
        return -1;
    });

    res.render('restaurants', {
        restaurantNum: storedRestaurants.length, 
        restaurants: storedRestaurants,
        nextOrder: nextOrder // 다음 순서 전달
    });
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