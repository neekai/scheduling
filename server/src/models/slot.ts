import { CreationOptional, Model, InferAttributes, InferCreationAttributes, ForeignKey, HasOneSetAssociationMixin } from "sequelize";
import { DataTypes } from "sequelize";
import sequelize from "../util/database";
import User from "./user";
import Feedback from "./feedback";

class Slot extends Model<InferAttributes<Slot>,InferCreationAttributes<Slot>> {
    declare id: CreationOptional<number>;
    declare startTime: Date;
    declare endTime: Date;
    declare isBooked: CreationOptional<Boolean>;
    declare completed: CreationOptional<Boolean>;
    declare coachId: ForeignKey<User['id']>;
    declare studentId: ForeignKey<User['id']>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    
    declare setFeedback: HasOneSetAssociationMixin<Feedback, 'id'>
}

Slot.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        isBooked: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        coachId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        tableName: 'slots',
        sequelize
    }
)

export default Slot;