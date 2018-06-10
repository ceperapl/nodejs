'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
			name: 'Product1',
			price: '11.1',
			amount: '23',
			createdAt: new Date(),
			updatedAt: new Date(),
		}, {
			name: 'Product2',
			price: '12.1',
			amount: '23',
			createdAt: new Date(),
			updatedAt: new Date(),
		}, {
			name: 'Product3',
			price: '13.1',
			amount: '23',
			createdAt: new Date(),
			updatedAt: new Date(),
		}, {
			name: 'Product4',
			price: '14.1',
			amount: '23',
			createdAt: new Date(),
			updatedAt: new Date(),
		}, {
			name: 'Product5',
			price: '15.1',
			amount: '22',
			createdAt: new Date(),
			updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
