export default (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    review: DataTypes.TEXT,
  }, {});
  Review.associate = function (models) {
    Review.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
    Review.belongsTo(models.Product, { as: 'product', foreignKey: 'productId' });
  };
  return Review;
};
