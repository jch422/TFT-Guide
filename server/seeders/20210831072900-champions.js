'use strict';

const championData = require('../static/champions.json');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const datas = [];
    championData.map(x => {
      const id = x.championId;
      const name = x.kr_name;
      const createdAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
      const updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
      datas.push({ id, name, createdAt, updatedAt });
    });
    await queryInterface.bulkInsert('Champions', datas, {});
    /*
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Champions', null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
