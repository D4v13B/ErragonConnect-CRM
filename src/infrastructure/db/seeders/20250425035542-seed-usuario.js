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

    await queryInterface.bulkInsert("Usuarios", [
      {
        id: 1,
        nombre: "NabuBot",
        email: "dbusta0215@nabucore.com",
        usuario: "NabuCore",
        password: "Nabu2025",
        verificado: true,
        rolId: 4,
        createdAt: date,
        updatedAt: date,
      },
      {
        id: 2,
        nombre: "David B.",
        email: "dbusta0215@gmail.com",
        usuario: "dbusta0215",
        password: "Nabu2025",
        verificado: true,
        rolId: 2,
        createdAt: date,
        updatedAt: date,
      },
      {
        id: 3,
        nombre: "Luis D.",
        email: "luis@e-integracion.com",
        usuario: "ldiaz",
        password: "Nabu2025",
        verificado: true,
        rolId: 2,
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

    await queryInterface.bulkDelete("Usuarios", null, {})
  },
}
