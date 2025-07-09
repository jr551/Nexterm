const { DataTypes } = require("sequelize");

module.exports = {
    async up(queryInterface) {
        try {
            await queryInterface.addColumn("servers", "position", {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: false,
            });
        } catch (error) {
            console.error("Server position column already exists, skipping migration.");
        }

        try {
            await queryInterface.addColumn("folders", "position", {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: false,
            });
        } catch (error) {
            console.error("Folder position column already exists, skipping migration.");
        }

        try {
            await queryInterface.addColumn("servers", "monitoringEnabled", {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            });
        } catch (error) {
            console.error("Server monitoringEnabled column already exists, skipping migration.");
        }

        try {
            await queryInterface.addColumn("servers", "config", {
                type: DataTypes.JSON,
                allowNull: true,
            });
        } catch (error) {
            console.error("Server config column already exists, skipping migration.");
        }
    },

};