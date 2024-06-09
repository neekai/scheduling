import { CreationOptional, DataTypes, Model, InferAttributes, InferCreationAttributes, HasManyGetAssociationsMixin, Association, NonAttribute } from "sequelize";
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

    declare static associations: {
        coachSlots: Association<User, Slot>;
        bookedSlots: Association<User, Slot>;
    }

    declare bookedSlots?: NonAttribute<Slot[]>;
    declare coachSlots?: NonAttribute<Slot[]>;
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