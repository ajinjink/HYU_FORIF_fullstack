const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'restaurants.json');
// 코드 위치가 바뀌면서 경로가 바뀌었음

function getStoredRestaurants() {
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    return storedRestaurants;
}

function storeRestaurants(storableRestaurants) {
    fs.writeFileSync(filePath, JSON.stringify(storableRestaurants));
}

// 함수만 만든다고 다른 파일에서 require 가능하지 않음
// 따로 내보내 줘야 함
module.exports = {
    getStoredRestaurants: getStoredRestaurants, // 외부에서 사용할 이름, 여기에서 내보내는 함수의 이름
    storeRestaurants: storeRestaurants
}; // 외부에 포인터 전달 