const fs = require('fs');

function readFile() {
    let fileData;

    // fileData = fs.readFileSync('data.txt'); // 동기 작업
    // console.log(fileData); // 6행이 끝나야 7행 시작

    fs.readFile('data.txt', function(error, fileData) { // 비동기 작업
        console.log('File parsing done!');
        console.log(fileData.toString());
    });

    console.log("I want to go home."); // 9행과 동시에 실행 (파일 읽기는 오래 걸리므로, 14행이 먼저 끝난다)
}

readFile();