const Login = require('../services/login');

const ERROR_500 = 'Algo de errado não está certo';

const loginController = {
  getAll: async (req, res) => {
    try {
      const { email } = req.body;
      const passwordNew = req.body.password;
      const user = await Login.loginService.getAll(email, passwordNew);
      if (!user) {
        return res.status(400).json({ message: 'Invalid fields' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: ERROR_500 });
    }
},
};

module.exports = {
  loginController,
};
