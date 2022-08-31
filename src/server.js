require('dotenv').config();
const app = require('./api');
const login = require('./controller/login');
const user = require('./controller/user');
const category = require('./controller/category');
const post = require('./controller/post');
const { createValidation } = require('./middlewares/login');
const { userValidation, displayNameValidation, nameValidation } = require('./middlewares/user');
const { 
  tokenValidation, 
  tokenUserValidation,
  tokenUserMeValidation,
} = require('./middlewares/token');
const { postValidation } = require('./middlewares/post');

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
app.get('/categories', tokenValidation, category.categoryController.getAll);
app.get('/post/search', tokenValidation, post.postController.getBySearch);
app.post('/post', tokenValidation, postValidation, post.postController.create);
app.get('/post', tokenValidation, post.postController.getAll);
app.get('/post/:id', tokenValidation, post.postController.getById);
app.put('/post/:id', postValidation, tokenUserValidation, post.postController.updateById);
app.delete(
  '/post/:id', tokenUserValidation, post.postController.deleteById,
  );
  app.delete(
    '/user/me', tokenUserMeValidation, user.userController.deleteById,
    );

app.listen(port, () => console.log('ouvindo porta', port));
