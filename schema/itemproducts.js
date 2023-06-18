import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class itemproducts extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    cartid: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: DataTypes.UUIDV4
    },
    productid: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'products',
        key: 'prodid'
      },
      unique: "unique_itemproducts"
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    subtotal: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    userid: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'userid'
      }
    }
  }, {
    sequelize,
    tableName: 'itemproducts',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "unique_itemproducts",
        unique: true,
        fields: [
          { name: "productid" },
        ]
      },
    ]
  });
  }
}
