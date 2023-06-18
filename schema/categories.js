import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class categories extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    cateid: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: DataTypes.UUIDV4,
      unique: "unique_cateid"
    },
    catename: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'categories',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "unique_cateid",
        unique: true,
        fields: [
          { name: "cateid" },
        ]
      },
    ]
  });
  }
}
