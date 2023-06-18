import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class orders extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        orderid: {
          primaryKey: true,
          type: DataTypes.UUID,
          allowNull: true,
          defaultValue: DataTypes.UUIDV4,
          unique: "unique_orderid",
        },
        orderno: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        userid: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: "users",
            key: "userid",
          },
        },
        totalprice: {
          type: DataTypes.DOUBLE,
          allowNull: true,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "orders",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "unique_orderid",
            unique: true,
            fields: [{ name: "orderid" }],
          },
        ],
      }
    );
  }
}
