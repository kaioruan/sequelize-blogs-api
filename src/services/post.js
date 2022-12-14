const { 
  BlogPost, User, Category, PostCategory, sequelize, Sequelize, 
} = require('../database/models');

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
  deleteById: async (id) => {
    const postId = await postService.getById(id);
    await postId.destroy();
  },
  getBySearch: async (q) => {
    const { Op } = Sequelize;
    const posts = await BlogPost.findAll({
      where: {
        [Op.or]: [{ title: { [Op.like]: `%${q}%` } }, { content: { [Op.like]: `%${q}%` } }],
      }, 
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } }, 
        { model: Category, as: 'categories', through: { attributes: [] } },
      ] });
    const result = await posts.map((user) => user.dataValues);
    return result || [];
},
};
module.exports = {
  postService,
};
