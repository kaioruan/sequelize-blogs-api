const jwt = require('jsonwebtoken');
const User = require('../services/user');
require('dotenv').config();

const ERROR_500 = 'Algo de errado não está certo';

const userController = {
  getAll: async (req, res) => {
    try {
      const user = await User.userService.getAll(req.body);
      if (!user) {
        return res.status(409).json({ message: 'User already registered' });
      }
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: ERROR_500 });
    }
},
  tokenController: async (_req, res) => {
    try {
      const user = await User.userService.getAllUser();
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: ERROR_500 });
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.userService.getById(id);
      if (!user) {
        return res.status(404).json({ message: 'User does not exist',
        }); 
      }
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: ERROR_500 });
    }
  },
  deleteById: async (req, res) => {
    try {
      const { authorization } = req.headers;
      const user = jwt.verify(authorization, process.env.JWT_SECRET);
      const { id } = user.dataUser.dataValues;
      await User.userService.deleteById(id);
      return res.status(204).end();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: ERROR_500 });
    }
  },
};
module.exports = {
  userController,
};
