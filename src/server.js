require('dotenv').config();
const app = require('./api');
const login = require('./controller/login');
const user = require('./controller/user');
const category = require('./controller/category');
const { createValidation } = require('./middlewares/login');
const { userValidation, displayNameValidation, nameValidation } = require('./middlewares/user');
const { tokenValidation } = require('./middlewares/token');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});
app.post('/login', createValidation, login.loginController.getAll);
app.post('/user', userValidation, displayNameValidation, user.userController.getAll);
app.get('/user', tokenValidation, user.userController.tokenController);
app.get('/user/:id', tokenValidation, user.userController.getById);
app.post('/categories', tokenValidation, nameValidation, category.categoryController.create);

app.listen(port, () => console.log('ouvindo porta', port));
