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
      return category.dataValues;
    });
    return transaction;
  },
  getAll: async () => {
    console.log('SERVICEEEEEEEEEEEEEEE');
    const result = await BlogPost.findAll({ 
      attributes: { exclude: ['UserId'] },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } }, 
        { model: Category, as: 'categories', through: { attributes: [] } },
      ] });
    console.log('AAAAAAAAAAAAAAAAACONSOLE TA AKI', result);
    return result;
  },
};

module.exports = {
  postService,
};
