'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn(
        "Clientes",
        "tag",
        {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        }
      ),
      queryInterface.addColumn(
        "Usuarios",
        "invisible",
        {
          type: Sequelize.INTEGER,
          defaultValue: 0
        }
      )
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
