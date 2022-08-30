const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const userService = {
  getAll: async (body) => {
      const { displayName, email, image } = body;
      const passwordNew = body.password;
      const user = await User.findOne({ where: { email } });
      if (user) {
        return null;
      }
      const userCreate = await User.create({ displayName, email, password: passwordNew, image });
      const { password, ...dataUser } = userCreate;
      const token = jwt.sign({ dataUser }, JWT_SECRET);
      return { token };
},
  getAllUser: async () => {
    const allUser = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    const result = allUser.map((user) => user.dataValues);
    return result;
},
  getById: async (id) => {
    const allUser = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    if (!allUser) return null;
    return allUser.dataValues;
  },
  deleteById: async (id) => {
    await User.destroy({
      where: { id },
    });
  },
};

module.exports = {
  userService,
};
