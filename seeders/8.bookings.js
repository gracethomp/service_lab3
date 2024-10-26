// eslint-disable-next-line @typescript-eslint/no-var-requires
const faker = require('@faker-js/faker').faker;

module.exports = {
  async up(queryInterface) {
    const bookings = [];
    for (let i = 0; i < 1000; i++) {
      const menteeId = faker.number.int({ min: 1001, max: 2000 });
      const mentorId = faker.number.int({ min: 1, max: 1000 });
      const meetingTime = faker.date.between({
        from: '2024-06-01T00:00:00.000Z',
        to: '2024-12-31T23:59:59.999Z',
      });
      bookings.push({
        menteeId,
        mentorId,
        meetingTime,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return await queryInterface.bulkInsert('Bookings', bookings, {});
  },

  async down(queryInterface) {
    return await queryInterface.bulkDelete('Bookings', null, {});
  },
};
