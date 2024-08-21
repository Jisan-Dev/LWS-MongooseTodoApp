const verifyToken = (req, res, next) => {
  console.log('eta hoilo token from middleware');
  next();
};

module.exports = { verifyToken };
