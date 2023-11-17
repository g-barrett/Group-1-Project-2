const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
      // Logic for non-authenticated users
      // res.redirect('/login');
  } else {
      // Logic for authenticated users
      next();
  }
};

module.exports = withAuth;
