const { categoryService } = require('../services/category');

const ERROR_500 = 'Algo de errado não está certo';

const categoryController = {
  create: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await categoryService.create(name);
      res.status(201).json(category);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: ERROR_500 });
    }
},
};

module.exports = {
  categoryController,
};
