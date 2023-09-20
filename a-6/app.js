const express = require('express');

const app = express();

app.use(express.urlencoded({extended: false})); // get, post 신경쓰지 않고 요청 처리. 경로 지정할 필요는 없음
// 모든 요청에 대해 사용할 수 있는 핸들러를 추가할 수도 있음 (미들웨어 함수)
// 익스프레스가 해당 요청을 보는 것과 해당 요청을 처리하는 코드 사이의 중간에 있기 때문
// urlencoded() 메서드는 바디 파서를 설정하는 메서드. 들어오는 요청 데이터 파서가 들어오는 모든 요청을 살펴봄.
// urlencoded는 요청이 form 양식 데이터를 갖고 있는지 찾은 후 포함된 데이터를 구문 분석해서 자바스크립트 객체로 변환
// urlencoded 메서드에 자바스크립트 객체를 인수로 전달해서 extended:false로 설정. 아니면 warning

app.get('/', function(req, res) {
    res.send("<form action='/store-user' method='POST'><label>Name</label><input type='text' name='username'><button>submit</button></form>");
});

// form에서 POST를 하면 사용자가 입력한 모든 정보가 요청에 정보로 저장되어 설정된 경로로 전달됨
app.post('/store-user', function(req, res) {
    // req에 form의 정보가 모두 담겨 있음
    // input의 name 속성으로 추축하려는 정보를 측정
    // req.body에 여러 입력 요소들이 들어있음
    const userName = req.body.username; // 이렇게 보내면 에러
    // 이름이 그냥 일반 텍스트로 저장돼서 전달. js 객체로 파싱을 해야 해
    console.log(userName);
    res.send("<h1>Username stored!</h1>"); // 요청에 대한 응답
});

app.listen(3000);

