

const checkEmployeeOrAdmin = (req, res, next) => {
  try {
    const token = req.cookies.jwt; // or wherever your token is stored (headers, cookies)
    if (!token) {
      return res.status(401).render('account/login', { message: 'Please log in to access this page.' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check account type
    if (decoded.account_type === 'Employee' || decoded.account_type === 'Admin') {
      // Allowed
      next();
    } else {
      // Not allowed
      return res.status(403).render('account/login', { message: 'Access denied. Insufficient permissions.' });
    }
  } catch (error) {
    return res.status(401).render('account/login', { message: 'Invalid token. Please log in again.' });
  }
};

module.exports = { checkEmployeeOrAdmin };
