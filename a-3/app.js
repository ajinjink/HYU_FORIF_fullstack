const http = require('http');

function handleRequest(request, response) {
    // 요청에서 데이터를 추출하거나, 다시 보내야 하는 응답을 준비
    // 들어오는 요청에서 데이터를 추출할 필요는 없지만, 응답은 반드시 보내야 함
    // 요청에 대한 응답을 되돌려 보내지 않는 웹 서버를 생성하면 에러가 뜸

    response.statusCode = 200; // 속성 설정

    // end 메서드를 사용해서 데이터를 클라이언트에게 보낼 수 있음
    response.end("<h1>Hello world!</h1>"); // 코드를 동적으로 생성
}
// 자체적으로 두 매개변수 값을 함수로 원함
// request, response는 자동으로 이 함수로 전달됨
// 요청이 해당 서버에 도달할 때마다 이 함수를 실행하면 노드가 자동으로 전달해줌

const server = http.createServer(handleRequest);
// 함수 뒤에 괄호는 안 붙임. 바로 실행하는 게 아니라 포인터만 전달
// 일반 자바스크립트 함수랑 같음
// 요청이 들어오면 저 함수를 실행시켜야 한다는 것을 createServer에게 알려줌
// createServer는 첫 번째 매개변수로 이벤트 리스너를 받음

server.listen(3000);