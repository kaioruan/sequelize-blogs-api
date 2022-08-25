const userValidation = (req, res, next) => {
  const { email, password } = req.body;
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email) || !email) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  if (!password || password.length < 6) {
    return res.status(400).json(
      { message: '"password" length must be at least 6 characters long' },
      );
  }
  next();
};

const nameValidation = (req, res, next) => {
  const { displayName } = req.body;
  if (!displayName || displayName.length < 8) {
    return res.status(400).json(
      { message: '"displayName" length must be at least 8 characters long' },
      );
  }
  next();
};

module.exports = { userValidation, nameValidation };