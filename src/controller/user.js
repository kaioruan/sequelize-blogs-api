const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const ERROR_500 = 'Algo de errado não está certo';

const userController = {
  getAll: async (req, res) => {
    try {
      const { displayName, email, image } = req.body;
      const passwordNew = req.body.password;
      const user = await User.findOne({ where: { email } });
      if (user) {
        return res.status(409).json({ message: 'User already registered' });
      }
      const userCreate = await User.create({ displayName, email, password: passwordNew, image });
      const { password, ...dataUser } = userCreate;
      const token = jwt.sign({ dataUser }, JWT_SECRET);
      res.status(201).json({ token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: ERROR_500 });
    }
},
};

module.exports = {
  userController,
};
