const jwt = require('jsonwebtoken');
const { postService } = require('../services/post');
require('dotenv').config();

const tokenValidation = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    jwt.verify(authorization, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  next();
};
const tokenUserValidation = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { id } = req.params;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const { userId } = await postService.getById(id);
    console.log(userId);
    const user = jwt.verify(authorization, process.env.JWT_SECRET);
    console.log(id, user.dataUser.dataValues);
    if (userId !== user.dataUser.dataValues.id) {
 return res.status(401).json(
      { message: 'Unauthorized user' },
      ); 
}
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  next();
};

module.exports = { tokenValidation, tokenUserValidation };