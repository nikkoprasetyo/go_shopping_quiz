import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class cart extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    cartid: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'itemproducts',
        key: 'productid'
      },
      unique: "unique_cartid"
    }
  }, {
    sequelize,
    tableName: 'cart',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "unique_cartid",
        unique: true,
        fields: [
          { name: "cartid" },
        ]
      },
    ]
  });
  }
}
