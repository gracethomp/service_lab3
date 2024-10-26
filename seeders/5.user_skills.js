/* eslint-disable @typescript-eslint/no-var-requires */
const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface) {
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users";`,
    );

    const skills = await queryInterface.sequelize.query(
      `SELECT id FROM "Skills";`,
    );

    const userSkills = [];

    users[0].forEach((user) => {
      const numberOfSkills = faker.number.int({ min: 1, max: 10 });
      const userSkillSet = new Set();

      for (let i = 0; i < numberOfSkills; i++) {
        let skillId;
        do {
          skillId =
            skills[0][faker.number.int({ min: 0, max: skills[0].length - 1 })]
              .id;
        } while (userSkillSet.has(skillId));

        userSkillSet.add(skillId);

        userSkills.push({
          userId: user.id,
          skillId: skillId,
        });
      }
    });

    return await queryInterface.bulkInsert('UserSkills', userSkills, {});
  },

  async down(queryInterface) {
    return await queryInterface.bulkDelete('UserSkills', null, {});
  },
};
