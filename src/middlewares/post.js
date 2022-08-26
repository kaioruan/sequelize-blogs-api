const postValidation = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title || !content) {
    return res.status(400).json(
      { message: 'Some required fields are missing' },
      );
  }
  if (categoryIds.length === 0) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }
  next();
};

module.exports = { postValidation };