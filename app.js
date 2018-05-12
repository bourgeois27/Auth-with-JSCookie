const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const auth = require('./routes/authentification');

let Users = [];
let activeSessions = [];
let loggedIn = false;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(session({
  key: 'user',
  secret: 's3cret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
}));

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = loggedIn;
  next();
});

app.get('/', auth.getIndex);

app.get('/about', auth.getAbout);

app.get('/userprofile', (req, res) => {
  let valid;
  valid = activeSessions.find((activeSession) => {
    return activeSession == req.cookies.userSession;
  });
  if (!valid) {
    req.flash('error_msg', 'You must be logged in to access this ressource');
    res.redirect('/login');
  }
  else {
    res.render('userprofile');
  }
});

app.get('/register', auth.register);

app.post('/register', (req, res) => {
  let usernameAlreadyTaken = false;
  Users.forEach((user) => {
    if (user.username === req.body.username) {
      usernameAlreadyTaken = true;
    }
  });
  if (!usernameAlreadyTaken) {
    const newUser = {
      username: req.body.username,
      password: req.body.password
    }
    Users.push(newUser);
    req.flash('success_msg', 'Registration successful! - Now login to acces your user profile');
    res.redirect('/login');
  }
  else {
    req.flash('error_msg', 'Username already taken...');
    res.redirect('/register');
  }
});

app.get('/login', auth.login);

app.post('/login', (req, res, next) => {
  let user;
  user = Users.find((user) => {
    return user.username == req.body.username;
  });
  if (!user) {
    res.status(403)
    res.render('login', {
      error: '403 - Username not found'
    });
  }
  else {
    if (user.password === req.body.password) {
      LoggedIn = true;
      activeSessions.push(req.sessionID);
      res.cookie('userSession', req.sessionID, { maxAge: 1000 * 3600 });
      req.flash('success_msg', `Welcome in ${req.body.username}!`);
      res.redirect('/userprofile');
    }
    else {
      res.status(403);
      res.render('login', {
        error: '403 - Password does not match'
      });
    }
  }
});

app.get('/logout', (req, res) => {
  LoggedIn = false;
  req.flash('success', 'logged out');
  res.clearCookie('userSession');
  res.redirect('/login');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
