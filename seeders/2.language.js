module.exports = {
  async up(queryInterface) {
    const languages = [
      { id: 1, name: 'English' },
      { id: 2, name: 'Spanish' },
      { id: 3, name: 'Mandarin' },
      { id: 4, name: 'Hindi' },
      { id: 5, name: 'Arabic' },
      { id: 6, name: 'Portuguese' },
      { id: 7, name: 'Bengali' },
      { id: 8, name: 'Russian' },
      { id: 9, name: 'Japanese' },
      { id: 10, name: 'Punjabi' },
      { id: 11, name: 'German' },
      { id: 12, name: 'Javanese' },
      { id: 13, name: 'Wu (Shanghainese)' },
      { id: 14, name: 'Malay/Indonesian' },
      { id: 15, name: 'Telugu' },
      { id: 16, name: 'Vietnamese' },
      { id: 17, name: 'Korean' },
      { id: 18, name: 'French' },
      { id: 19, name: 'Marathi' },
      { id: 20, name: 'Tamil' },
      { id: 21, name: 'Urdu' },
      { id: 22, name: 'Turkish' },
      { id: 23, name: 'Italian' },
      { id: 24, name: 'Thai' },
      { id: 25, name: 'Gujarati' },
    ];
    return await queryInterface.bulkInsert('Languages', languages, {});
  },

  async down(queryInterface) {
    return await queryInterface.bulkDelete('Languages', null, {});
  },
};
