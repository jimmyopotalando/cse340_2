const jwt = require("jsonwebtoken");

function checkEmployeeOrAdmin(req, res, next) {
  const token = req.cookies.jwt;

  if (!token) {
    req.flash("notice", "You must be logged in to access this page.");
    return res.redirect("/account/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { account_type } = decoded;

    if (account_type === "Employee" || account_type === "Admin") {
      res.locals.accountData = decoded;
      return next();
    } else {
      req.flash("notice", "You do not have permission to view this page.");
      return res.redirect("/account/login");
    }

  } catch (err) {
    console.error("JWT verification failed:", err.message);
    req.flash("notice", "Session expired or invalid.");
    return res.redirect("/account/login");
  }
}

module.exports = { checkEmployeeOrAdmin };
