const createValidation = (req, res, next) => {
  const { email, password } = req.body;
  const emailRegex = /\S+@\S+\.\S+/;
  if (!email) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid fields' });
  }
  if (!password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  // if (password.length === 0) { 
  //   return res.status(400).json({ message: 'Invalid fields' });
  // }
  next();
};

module.exports = { createValidation };