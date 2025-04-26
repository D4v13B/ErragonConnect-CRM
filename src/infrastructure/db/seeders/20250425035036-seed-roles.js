"use strict"


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const date = new Date()

    await queryInterface.bulkInsert("Rols", [

      {
        id: 1,
        nombre: "Admin",
        createdAt: date,
        updatedAt: date
      },
      {
        id: 2 ,
        nombre: "SuperUser",
        createdAt: date,
        updatedAt: date
      },
      {
        id: 3,
        nombre: "Agente",
        createdAt: date,
        updatedAt: date
      },
      {
        id: 4,
        nombre: "Bot",
        createdAt: date,
        updatedAt: date
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
    */
    await queryInterface.bulkDelete('Rols', null, {});
  },
}
