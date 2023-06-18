import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _cart from "./cart.js";
import _categories from "./categories.js";
import _itemproducts from "./itemproducts.js";
import _orderlineitems from "./orderlineitems.js";
import _orders from "./orders.js";
import _products from "./products.js";
import _users from "./users.js";

import Sequelize from "sequelize";
import config from "../../config/config.js";

const sequelize = new Sequelize(
  config.db_name,
  config.db_username,
  config.db_password,
  {
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

function initModels(sequelize) {
  const cart = _cart.init(sequelize, DataTypes);
  const categories = _categories.init(sequelize, DataTypes);
  const itemproducts = _itemproducts.init(sequelize, DataTypes);
  const orderlineitems = _orderlineitems.init(sequelize, DataTypes);
  const orders = _orders.init(sequelize, DataTypes);
  const products = _products.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  products.belongsTo(categories, { as: "category", foreignKey: "categoryid" });
  categories.hasMany(products, { as: "products", foreignKey: "categoryid" });
  cart.belongsTo(itemproducts, { as: "cart", foreignKey: "cartid" });
  itemproducts.hasOne(cart, { as: "cart", foreignKey: "cartid" });
  orderlineitems.belongsTo(orders, { as: "order", foreignKey: "orderid" });
  orders.hasMany(orderlineitems, {
    as: "orderlineitems",
    foreignKey: "orderid",
  });
  itemproducts.belongsTo(products, { as: "product", foreignKey: "productid" });
  products.hasOne(itemproducts, { as: "itemproduct", foreignKey: "productid" });
  itemproducts.belongsTo(users, { as: "user", foreignKey: "userid" });
  users.hasMany(itemproducts, { as: "itemproducts", foreignKey: "userid" });
  orders.belongsTo(users, { as: "user", foreignKey: "userid" });
  users.hasMany(orders, { as: "orders", foreignKey: "userid" });

  return {
    cart,
    categories,
    itemproducts,
    orderlineitems,
    orders,
    products,
    users,
  };
}
const models = initModels(sequelize);
export default models;
export { sequelize };
