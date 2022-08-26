const jwt = require('jsonwebtoken');
const { postService } = require('../services/post');

const ERROR_500 = 'Algo de errado não está certo';

const postController = {
  create: async (req, res) => {
    try {
      const { authorization } = req.headers;
      const token = jwt.verify(authorization, process.env.JWT_SECRET);
      const userId = token.dataUser.dataValues.id;
      const { title, content, categoryIds } = req.body;
      const post = await postService.create(title, content, categoryIds, userId);
      if (!post) return res.status(400).json({ message: '"categoryIds" not found' });
      res.status(201).json(post);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: ERROR_500 });
    }
  },
  getAll: async (_req, res) => {
    try {
      const post = await postService.getAll();
      res.status(200).json(post);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: ERROR_500 });
    }
  },
};

module.exports = {
  postController,
};
