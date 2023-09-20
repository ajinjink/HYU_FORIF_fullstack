const express = require('express');
// http 패키지를 포함했을 때와 같이 익스프레스 객체를 제공한다
// 객체를 상수에 저장하자

// 중요한 건 저 익스프레스 객체가 아니라 함수다
const app = express();
// express 함수의 반환값이 앱 객체

//// function handleCurrentTimeRequest() {} // 이렇게 할 수도 있겠지만
//// 익명 함수 만들면 더 짧음. 익스프레스 아니고 밑에서도 가능
app.get('/currenttime', function(req, res) {
    // currenttime 경로로 들어오는 요청이 있으면 실행될 함수
    res.send("<h1>" + new Date().toISOString() + "</h1>"); // 응답을 되돌려 보내는 메서드. end와 같은 역할
}); // localhost:3000/currenttime
// get 요청에 대한 요청 핸들러를 정의할 수 있음
// forms에서 GET과 POST 메서드 중, get은 브라우저에서 보내는 기본 요청

app.get('/', function(req, res) { // localhost:3000/
    res.send("<h1>Hello world!</h1>");
});
// statusCode는 따로 설정하지 않으면 디폴트로 200

app.listen(3000);
// listen 함수 호출. 수동으로 설정한 서버와 같이 포트에서 수신
// 현재 서버는 익스프레스가 뒤에서 생성
