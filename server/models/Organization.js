const Sequelize = require("sequelize");
const db = require("../utils/database");

module.exports = db.define("organizations", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true,
    }
}, { freezeTableName: true });