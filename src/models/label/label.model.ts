import { Model, DataTypes, BuildOptions } from "sequelize";
import { db } from "../../config/database";

export class Label extends Model {
  public id!: number;
  public userId!: number
}

Label.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
  },
  {
    tableName: "labels",
    sequelize: db
  }
);
