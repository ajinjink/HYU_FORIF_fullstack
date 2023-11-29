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

router.post("/login", async function (req, res) {});

router.get("/admin", function (req, res) {
	  res.render("admin");
});

router.post("/logout", function (req, res) {});

module.exports = router;
