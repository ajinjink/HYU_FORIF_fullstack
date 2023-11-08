const fs = require('fs/promises'); // 프로미스

function readFile() {
    let fileData;

    // fs.readFile('data.txt', function(error, fileData) { // 콜백 함수
    //     if (error) // do something // 오류 처리
    //     console.log('File parsing done!');
    //     console.log(fileData.toString());
    // });

    fs.readFile('data.txt') // 프로미스
    .then(function(fileData) {
        console.log('File parsing done!');
        console.log(fileData.toString());
    })
    .then(function() {})
    .catch(function(error) { // 오류처리
        console.log(error);
    });

    console.log("I want to go home.");
}

readFile();