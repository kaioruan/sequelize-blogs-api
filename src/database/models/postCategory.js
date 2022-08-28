module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define("PostCategory", {
    postId: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
    },
    categoryId: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
    },
  }, {
    updatedAt: false,
    timestamps: false,
    tableName: 'PostCategories'
  });
  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
      as: "blogpost"
    });
    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategory,
      foreignKey: "postId",
      otherKey: 'categoryId',
      as: "categories"
    });
  }
  return PostCategory;
};