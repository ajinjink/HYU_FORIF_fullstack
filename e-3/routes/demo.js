const express = require("express");
const bcrypt = require('bcryptjs'); // 암호화 패키지

const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
	  res.render("welcome");
});

router.get("/signup", function (req, res) {
	  res.render("signup");
});

router.get("/login", function (req, res) {
	  res.render("login");
});

router.post("/signup", async function (req, res) { // 회원가입
    const userData = req.body; // 양식에서 데이터 추출
    const enteredEmail = userData.email;
    const enteredConfirmEmail = userData["confirm-email"];
    const enteredPassword = userData.password;

    const hashedPassword = await bcrypt.hash(enteredPassword, 12); // 비밀번호 암호화

    const data = [enteredEmail, hashedPassword];

    await db.query('insert into users (email, password) values (?)', [data]); // 사용자 정보 기입

    res.redirect('/login');
});

router.post("/login", async function (req, res) {
    const userData = req.body; // 양식에서 데이터 추출
    const enteredEmail = userData.email;
    const enteredPassword = userData.password;

    const [existingUsers] = await db.query('select * from users where email = ?', [enteredEmail]); // 사용자 정보 불러오기
    const existingUser = existingUsers[0];

    if (!existingUser || existingUser.length === 0) { // 사용자가 존재하지 않음
        console.log('wrong user data input');
        return res.redirect('/login');
    }

    const passwordEqual = await bcrypt.compare(enteredPassword, existingUser.password); // 저장된 암호와 현재 입력된 암호 비교

    if (!passwordEqual) { // 사용자는 존재하지만 비밀번호가 틀림
        console.log('wrong user data input');
        return res.redirect('/login');
    }

    req.session.user = {id: existingUser.id, email: existingUser.email}; // 세션으로 사용자 정보 저장
    req.session.isAuthenticated = true; // 로그인 성공 플래그
    req.session.save(function() { // 세션 저장
        res.redirect('/admin');
    });

    console.log('user is authenticated');
    // res.redirect('/admin');
});

router.get("/admin", function (req, res) {
    if (!req.session.isAuthenticated) { // 로그인을 하지 않았다면
        return res.status(401).render('401'); // 권한 없음
    }
	res.render("admin");
});

router.post("/logout", function (req, res) {});

module.exports = router;
