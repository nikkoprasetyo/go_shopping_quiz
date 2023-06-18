import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class products extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    prodid: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: DataTypes.UUIDV4,
      unique: "unique_prodid"
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    categoryid: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'cateid'
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'products',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "unique_prodid",
        unique: true,
        fields: [
          { name: "prodid" },
        ]
      },
    ]
  });
  }
}
