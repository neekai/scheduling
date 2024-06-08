import { Sequelize } from "sequelize";

const sequelize = new Sequelize('postgres', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

export default sequelize;
