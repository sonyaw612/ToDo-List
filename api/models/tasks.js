const { Sequelize, DataTypes } = require('sequelize');

/*
DB: todolist
User: qweenii
Password: null / ''
Underlying Connector Library: postgres
*/
const sequelize = new Sequelize('todolist', 'qweenii', null, { dialect: 'postgres' });

const tasks = sequelize.define('tasks', {
    task: { type: Sequelize.STRING },
    completed: { type: Sequelize.BOOLEAN}
}, {
    timestamps: false       // does not include time created and etc.
}
);

// tasks.removeAttribute('id') // does not inlude the automated id

module.exports = { tasks }