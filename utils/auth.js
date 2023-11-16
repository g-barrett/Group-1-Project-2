// Checks to see if the person is logged in to the site. If they are not, they are redirected to the login page. If they are, they are allowed to continue to the route they requested.

const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
      res.redirect('/home');
    } else {
      next();
    }
  };

module.exports = withAuth;