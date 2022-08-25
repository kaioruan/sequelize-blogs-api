const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const ERROR_500 = 'Algo de errado não está certo';

const loginController = {
  getAll: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ where: { email } });
      console.log('AKI O CONSOLE DESGRAÇA', user);
      if (!user || user.password !== req.body.password) {
        return res.status(400).json({ message: 'Invalid fields' });
      }
      const { password, ...dataUser } = user;
      const token = jwt.sign({ dataUser }, JWT_SECRET);
      res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: ERROR_500 });
    }
},
};

module.exports = {
  loginController,
};
