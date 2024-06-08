import { CreationOptional, DataTypes, Model, InferAttributes, InferCreationAttributes, HasManyGetAssociationsMixin } from "sequelize";
import sequelize from "../util/database";
import { Role } from "../util/constants";
import Slot from "./slot";

class User extends Model<InferAttributes<User>,InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare role: Role;
    declare phoneNumber: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare getBookedSlots: HasManyGetAssociationsMixin<Slot>;
}

User.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM(Role.Coach, Role.Student),
        allowNull: false
    },
    phoneNumber: new DataTypes.STRING(128),
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    tableName: 'users',
    sequelize
})

export default User;