const { BlogPost, User, Category } = require('../database/models');

const postService = {
  create: async (title, content, categoryIds) => {
    const categoryValidation = await Promise.all(
      categoryIds.map((id) => BlogPost.findOne({ where: { id } })),
      );
    if (!categoryValidation) return null;
    const category = await BlogPost.create({ title, content, categoryIds });
    console.log(category);
      return category;
  },
  getAll: async () => {
    const result = await BlogPost.findAll({
      include: [{ model: User,
      as: 'user',
      attributes: { exclude: ['password'] } }, 
      {
        model: Category,
        as: 'categories',
      }],
    });
    return result;
  },
};

module.exports = {
  postService,
};
