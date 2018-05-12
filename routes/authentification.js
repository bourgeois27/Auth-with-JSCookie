exports.getIndex = (req, res) => {
  res.render('index');
};

exports.getAbout = (req, res) => {
  res.render('about');
};

exports.register = (req, res) => {
  res.render('register');
};

exports.login = (req, res) => {
  res.render('login');
};
