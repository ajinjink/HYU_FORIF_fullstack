const fs = require('fs/promises');

async function readFile() {
    let fileData;

    try { // 동기식 처리
        fileData = await fs.readFile('data.txt'); // 동기식
    } catch (error) { // try-catch를 사용한 오류 핸들링 가능
        console.log(error);
    }
    // await 작업이 끝날 때까지 아래로 진행하지 않음
    
    console.log('File parsing done!');
    console.log(fileData.toString());
    console.log("I want to go home.");
}

readFile();