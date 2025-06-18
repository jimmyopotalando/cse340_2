// middleware/authMiddleware.js

/**
 * Middleware to check if the logged-in user is an Employee or Admin.
 * Assumes req.account is populated by JWT middleware or session logic.
 */

function checkEmployeeOrAdmin(req, res, next) {
    const account = req.account;
  
    if (!account) {
      return res.status(401).send("Unauthorized: Account data missing.");
    }
  
    const type = account.account_type;
    if (type === "Employee" || type === "Admin") {
      return next(); // user is authorized
    }
  
    return res.status(403).send("Forbidden: You do not have access to this resource.");
  }
  
  module.exports = { checkEmployeeOrAdmin };
  