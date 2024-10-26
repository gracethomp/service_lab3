// eslint-disable-next-line @typescript-eslint/no-var-requires
const faker = require('@faker-js/faker').faker;

const jobTitles = [
  'Software Engineer',
  'Backend Developer',
  'Frontend Developer',
  'Full Stack Developer',
  'Data Scientist',
  'Machine Learning Engineer',
  'DevOps Engineer',
  'QA Engineer',
  'Mobile Developer',
  'Game Developer',
  'Systems Analyst',
  'Cloud Engineer',
  'Security Engineer',
  'Database Administrator',
  'Network Engineer',
  'IT Consultant',
  'AI Researcher',
  'Embedded Systems Developer',
  'Web Developer',
  'Blockchain Developer',
  'Middle Software Engineer',
  'Senior Software Engineer',
  'Middle Backend Developer',
  'Senior Backend Developer',
  'Middle Frontend Developer',
  'Senior Frontend Developer',
  'Middle Full Stack Developer',
  'Senior Full Stack Developer',
  'Middle Data Scientist',
  'Senior Data Scientist',
  'Middle Machine Learning Engineer',
  'Senior Machine Learning Engineer',
  'Middle DevOps Engineer',
  'Senior DevOps Engineer',
  'Middle QA Engineer',
  'Senior QA Engineer',
  'Middle Mobile Developer',
  'Senior Mobile Developer',
  'Middle Game Developer',
  'Senior Game Developer',
  'Java Developer',
  'Senior Java Developer',
  'Python Developer',
  'Senior Python Developer',
  'JavaScript Developer',
  'Senior JavaScript Developer',
  'C++ Developer',
  'Senior C++ Developer',
  'TypeScript Developer',
  'Senior TypeScript Developer',
  'Ruby on Rails Developer',
  'Senior Ruby on Rails Developer',
  'Node.js Developer',
  'Senior Node.js Developer',
  'React Developer',
  'Senior React Developer',
  'Angular Developer',
  'Senior Angular Developer',
  'Vue.js Developer',
  'Senior Vue.js Developer',
];

module.exports = {
  async up(queryInterface) {
    const mentors = [];
    for (let i = 0; i < 1000; i++) {
      mentors.push({
        email: faker.internet.email(),
        password: faker.internet.password(),
        name: faker.person.firstName(),
        surname: faker.person.lastName(),
        jobTitle: jobTitles[Math.floor(Math.random() * jobTitles.length)],
        experience: faker.number.int({ min: 1, max: 40 }),
        currentCompany: faker.company.name(),
        avatar: faker.image.avatar(),
        isVerified: faker.datatype.boolean(),
        role: 'Mentor',
        description: faker.person.bio(),
        regionId: faker.number.int({ min: 1, max: 6 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return await queryInterface.bulkInsert('Users', mentors, {});
  },

  async down(queryInterface) {
    return await queryInterface.bulkDelete('Users', { role: 'Mentor' }, {});
  },
};
