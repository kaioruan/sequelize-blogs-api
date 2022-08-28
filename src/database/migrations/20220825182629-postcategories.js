'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('PostCategories', {
      postId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        foreignKey: true,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'BlogPosts',
          key: 'id',
        },
      },
      categoryId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        foreignKey: true,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Categories',
          key: 'id',
        },
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('PostCategories');
  }
};
