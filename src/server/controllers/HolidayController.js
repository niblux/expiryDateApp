exports.myMiddleware = (req, res, next) => {
  if (req.params.name.length > 4) {
    next();
  } else {
    res.send('You shall not pass');
  }
};

exports.home = (req, res) => {
  res.send('Home Page');
};

exports.testPage = (req, res) => {
  res.render('index');
};

exports.withParams = (req, res) => {
  res.json(req.params);
};

exports.create = (req, res) => {
  res.json(req.params);
};

exports.showForm = (req, res) => {
  res.json(req.params);
};
