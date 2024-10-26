/* eslint-disable @typescript-eslint/no-var-requires */
const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface) {
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users";`,
    );

    const languages = await queryInterface.sequelize.query(
      `SELECT id FROM "Languages";`,
    );

    const userLanguages = [];

    users[0].forEach((user) => {
      const numberOfLanguages = faker.number.int({ min: 1, max: 5 });
      const userLanguageSet = new Set();

      for (let i = 0; i < numberOfLanguages; i++) {
        let languageId;
        do {
          languageId =
            languages[0][
              faker.number.int({ min: 0, max: languages[0].length - 1 })
            ].id;
        } while (userLanguageSet.has(languageId));

        userLanguageSet.add(languageId);

        userLanguages.push({
          userId: user.id,
          languageId: languageId,
        });
      }
    });

    return await queryInterface.bulkInsert('UserLanguages', userLanguages, {});
  },

  async down(queryInterface) {
    return await queryInterface.bulkDelete('UserLanguages', null, {});
  },
};
