const path = require('path');

const express = require('express');
const session = require('express-session');
const mysqlSession = require('express-mysql-session')(session);

const db = require('./data/database');
const demoRoutes = require('./routes/demo');

const sessionStore = new mysqlSession({}, db); // 데이터베이스에 세션 연결

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(session({ // 미들웨어로 세션 사용
  secret: 'super-secret', // secret key
  resave: false, // save on session change
  saveUninitialized: false,
  store: sessionStore // where to store
}));

app.use(demoRoutes);

app.use(function(error, req, res, next) {
  res.render('500');
})

app.listen(5000);
