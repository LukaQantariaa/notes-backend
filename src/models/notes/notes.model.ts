import { Model, DataTypes, BuildOptions } from "sequelize";
import * as Sequelize from 'sequelize'
import { db } from "../../config/database";

export class Note extends Model {
  public id!: number;
  public imagePath!: string;
  public labels!: [];
  public title!: string;
  public notes!: [];
  public color!: string;
  public archived!: boolean;
  public done!: boolean;
  public is_active!: boolean;
  public userId!: number
  //public readonly createdAt!: Date;
}

Note.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    imagePath: {
      type: new DataTypes.STRING(128),
      allowNull: true
    },
    labels: {
      type: new DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    title: {
      type: new DataTypes.STRING(64),
      allowNull: false
    },
    notes: {
        type: new DataTypes.ARRAY(DataTypes.NUMBER),
        allowNull: false
    },
    color: {
        type: new DataTypes.STRING(10),
        allowNull: true
    },
    archived: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    userId: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    done: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  },
  {
    tableName: "notes",
    sequelize: db
  }
);
