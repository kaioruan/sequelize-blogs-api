const { BlogPost, User, Category, PostCategory, sequelize } = require('../database/models');

const postService = {
  create: async (title, content, categoryIds, userId) => {
    const transaction = await sequelize.transaction(async (transact) => {
      const { rows } = await Category.findAndCountAll({ where: { id: categoryIds } });
      if (!rows.length) return null;
      const category = await BlogPost.create({ title, content, userId }, { transaction: transact });
      const postCategories = categoryIds.map((categoryId) => ({
        postId: category.dataValues.id,
        categoryId,
      }));
      await PostCategory.bulkCreate(postCategories, { transaction: transact });
      console.log(category);
      return category.dataValues;
    });
    return transaction;
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
