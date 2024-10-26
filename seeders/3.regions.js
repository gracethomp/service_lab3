module.exports = {
  async up(queryInterface) {
    const regions = [
      { id: 1, name: 'Africa' },
      { id: 2, name: 'Asia' },
      { id: 3, name: 'Europe' },
      { id: 4, name: 'North America' },
      { id: 5, name: 'South America' },
      { id: 6, name: 'Australia' },
    ];
    return await queryInterface.bulkInsert('Regions', regions, {});
  },

  async down(queryInterface) {
    return await queryInterface.bulkDelete('Regions', null, {});
  },
};
