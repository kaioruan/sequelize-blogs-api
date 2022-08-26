const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const loginService = {
  getAll: async (email, passwordCheck) => {
      const user = await User.findOne({ where: { email } });
      if (!user || user.password !== passwordCheck) {
        return null;
      }
      const { password, ...dataUser } = user;
      const token = jwt.sign({ dataUser }, JWT_SECRET);
      return { token };
},
};

module.exports = {
  loginService,
};
