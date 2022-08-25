require('dotenv').config();
const app = require('./api');
const login = require('./controller/login');
const user = require('./controller/user');
const { createValidation } = require('./middlewares/login');
const { userValidation, nameValidation } = require('./middlewares/user');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});
app.post('/login', createValidation, login.loginController.getAll);
app.post('/user', userValidation, nameValidation, user.userController.getAll);

app.listen(port, () => console.log('ouvindo porta', port));
