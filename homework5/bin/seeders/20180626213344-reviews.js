'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [{
			userId: 1,
			productId: 1,
			review: 'Good product!',
			createdAt: new Date(),
			updatedAt: new Date(),
		}, {
			userId: 2,
			productId: 2,
			review: 'The product is awesome!',
			createdAt: new Date(),
			updatedAt: new Date(),
		}], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};
