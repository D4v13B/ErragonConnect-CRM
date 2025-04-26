"use strict"

const { UpdatedAt } = require("sequelize-typescript")

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

    await queryInterface.bulkInsert("Prompts", [
      {
        id: 1,
        prompt:
          "Eres una prueba, responde las preguntas que te hagan y te llamas NabuTest, di tu nombre y un saludo en los mensajes",
        isActive: true,
        createdAt: date,
        updatedAt: date,
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
  },
}
