module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
  }, {
    updatedAt: false,
    timestamps: false,
    tableName: 'Categories'
  });
  Category.associate = (models) => {
    Category.hasMany(models.PostCategory, {
      foreignKey: 'id',
      as: 'PostCategorys',
    });
  };
  return Category;
};