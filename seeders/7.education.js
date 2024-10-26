/* eslint-disable @typescript-eslint/no-var-requires */
const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');

const majors = [
  'Computer Science',
  'Software Engineering',
  'Information Technology',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Biomedical Engineering',
  'Physics',
  'Mathematics',
  'Statistics',
  'Biology',
  'Chemistry',
  'Economics',
  'Business Administration',
  'Finance',
  'Marketing',
  'Accounting',
  'Psychology',
  'Sociology',
  'Political Science',
  'History',
  'Philosophy',
  'Linguistics',
  'Literature',
  'Art History',
  'Music',
  'Theater',
  'Education',
  'Environmental Science',
  'Geology',
  'Geography',
  'Anthropology',
  'Archaeology',
  'Astronomy',
  'Neuroscience',
  'Public Health',
  'Nursing',
  'Medicine',
  'Law',
];

module.exports = {
  async up(queryInterface) {
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users";`,
    );

    const universitiesPath = path.resolve(
      __dirname,
      'data-source/universities.json',
    );
    const universities = JSON.parse(fs.readFileSync(universitiesPath, 'utf-8'));

    const educations = [];

    users[0].forEach((user) => {
      const numberOfEducations = faker.number.int({ min: 1, max: 3 });

      for (let i = 0; i < numberOfEducations; i++) {
        const startYear = faker.number.int({ min: 1990, max: 2015 });
        const endYear = startYear + faker.number.int({ min: 3, max: 6 });

        const university =
          universities[
            faker.number.int({ min: 0, max: universities.length - 1 })
          ];
        const major =
          majors[faker.number.int({ min: 0, max: majors.length - 1 })];

        educations.push({
          universityName: university.name,
          major: major,
          startYear: startYear,
          endYear: endYear,
          userId: user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    });

    return await queryInterface.bulkInsert('Education', educations, {});
  },

  async down(queryInterface) {
    return await queryInterface.bulkDelete('Education', null, {});
  },
};
