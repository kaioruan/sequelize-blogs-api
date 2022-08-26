const { Category } = require('../database/models');

const categoryService = {
  create: async (name) => {
    const category = await Category.create({ name });
      return category;
},
};

module.exports = {
  categoryService,
};
