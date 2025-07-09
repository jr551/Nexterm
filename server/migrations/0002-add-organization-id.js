const { DataTypes } = require("sequelize");

module.exports = {
    async up(queryInterface) {
        const organizationIdExists = await queryInterface.describeTable("identities").then((table) => table.organizationId !== undefined);
        if (organizationIdExists) {
            console.log("Migration already applied: organizationId column exists.");
            return;
        }
        
        await queryInterface.addColumn("identities", "organizationId", {
            type: DataTypes.INTEGER,
            allowNull: true,
        });

        await queryInterface.addColumn("servers", "organizationId", {
            type: DataTypes.INTEGER,
            allowNull: true,
        });

        await queryInterface.addColumn("folders", "organizationId", {
            type: DataTypes.INTEGER,
            allowNull: true,
        });
        
        await queryInterface.addColumn("pve_servers", "organizationId", {
            type: DataTypes.INTEGER,
            allowNull: true,
        });
    },

};