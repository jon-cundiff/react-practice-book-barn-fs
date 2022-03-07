"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn("Users", "email", {
            type: Sequelize.STRING,
            allowNull: false,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.changeColumn("Users", "email", {
            type: Sequelize.STRING,
        });
    },
};
