/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');
const fs = require('fs');

async function fetchUniversities() {
  try {
    const response = await axios.get('http://universities.hipolabs.com/search');
    const universities = response.data;

    fs.writeFileSync(
      'backend/seeders/data-source/universities.json',
      JSON.stringify(universities, null, 2),
    );
    console.log('Universities data saved to universities.json');
  } catch (error) {
    console.error('Error fetching universities data:', error);
  }
}

fetchUniversities();
