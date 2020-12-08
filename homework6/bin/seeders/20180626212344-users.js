'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'demo@demo.com',
      passwordHash: '$2b$10$Bex7XgoEd3SltHX1VevXhOFoHIEWb4ntPIq6TqFszpuLQv8E2m4j6',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: 'Marina',
      lastName: 'Selyukova',
      email: 'marina_selyukova@gmail.com',
      passwordHash: '$2b$10$mlZhIv3YpFHH0yQqP2URHu.2s8opiD3s5H1iyuXJjRoHMYTCIPNeC',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: 'Siarhei',
      lastName: 'Pazdniakou',
      email: 'siarhei_pazdniakou1@epam.com',
      passwordHash: '$2b$10$oMo7zk0AC9vip6o3wFrhcujj133Z.HRKcz3v9w6t5uxj4qO4g6r1u',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
