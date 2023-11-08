const fs = require('fs/promises'); // 프로미스

function readFile() {
    let fileData;

    // fs.readFile('data.txt', function(error, fileData) {
    //     console.log('File parsing done!');
    //     console.log(fileData.toString());
    // });

    fs.readFile('data.txt')
    .then(function(fileData) {
        console.log('File parsing done!');
        console.log(fileData.toString());
    })
    .then(function() {});

    console.log("I want to go home.");

}

readFile();