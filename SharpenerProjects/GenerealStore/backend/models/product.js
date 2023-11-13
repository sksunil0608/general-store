const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  product_name: Sequelize.STRING,
  product_desc: Sequelize.STRING,
  product_price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  product_quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Product;
