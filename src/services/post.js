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
    const result = await BlogPost.findAll({ 
      attributes: { exclude: ['UserId'] },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } }, 
        { model: Category, as: 'categories', through: { attributes: [] } },
      ] });
    return result;
  },
  getById: async (id) => {
    const postId = await BlogPost.findByPk(id, {
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } }, 
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    if (!postId) return null;
    return postId;
  },
  updateById: async (id, title, content) => {
    const postId = await postService.getById(id);
    const result = await postId.update({ title, content });
    return result;
  },
};

module.exports = {
  postService,
};
