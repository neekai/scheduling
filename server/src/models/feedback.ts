import { CreationOptional, Model, InferAttributes, InferCreationAttributes, ForeignKey } from "sequelize";
import { DataTypes } from "sequelize";
import sequelize from "../util/database";
import Slot from "./slot";

class Feedback extends Model<InferAttributes<Feedback>,InferCreationAttributes<Feedback>> {
    declare id: CreationOptional<number>;
    declare rating: number;
    declare notes: Text;
    declare slotId: ForeignKey<Slot['id']>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Feedback.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            }
        },
        notes: {
            type: DataTypes.TEXT
        },
        slotId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'slots',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        tableName: 'feedbacks',
        sequelize
    }
);


export default Feedback;
