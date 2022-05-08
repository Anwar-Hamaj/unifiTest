exports.checkToken = async (req, res, next) => {
  if (!req.headers.token) {
    return res.status(401).send({ message: "your site dont have token" });
  } else {
    next();
  }
};
