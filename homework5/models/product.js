export default (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    amount: DataTypes.INTEGER,
  }, {});
  Product.associate = function (models) {
    Product.hasMany(models.Review, { as: 'reviews', foreignKey: 'productId' });
  };
  return Product;
};
