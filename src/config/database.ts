import { Sequelize } from 'sequelize';

export const db = new Sequelize('notes', 'postgres', 'uparolo12345', {
    host: 'localhost',
    dialect: 'postgres'
});