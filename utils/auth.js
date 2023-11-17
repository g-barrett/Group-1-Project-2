const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
      // Logic for non-authenticated users
      next();
  } else {
      // Logic for authenticated users
      next();
  }
};

module.exports = withAuth;
