import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class orderlineitems extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    orderlineid: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: DataTypes.UUIDV4,
      unique: "unique_orderlineid"
    },
    productid: {
      type: DataTypes.UUID,
      allowNull: true
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    subtotal: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    orderid: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'orders',
        key: 'orderid'
      }
    }
  }, {
    sequelize,
    tableName: 'orderlineitems',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "unique_orderlineid",
        unique: true,
        fields: [
          { name: "orderlineid" },
        ]
      },
    ]
  });
  }
}
