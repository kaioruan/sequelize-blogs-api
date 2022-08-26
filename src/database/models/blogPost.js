module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define("BlogPost", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: DataTypes.STRING,
    content:DataTypes.STRING,
    userId: {
      type:DataTypes.INTEGER,
      foreignKey: true,
    },
    published: DataTypes.DATE,
    updated:DataTypes.DATE,
  }, {
    updatedAt: false,
    timestamps: false,
    tableName: 'BlogPosts'
  });
  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignKey: "id",
      as: "user"
    });
  }
  BlogPost.associate = (models) => {
    BlogPost.hasMany(models.PostCategory, {
      foreignKey: 'id',
      as: 'PostCategorys',
    });
  };
  return BlogPost;
};