'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'demo@demo.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: 'Marina',
      lastName: 'Selyukova',
      email: 'marina_selyukova@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: 'Siarhei',
      lastName: 'Pazdniakou',
      email: 'siarhei_pazdniakou@epam.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
