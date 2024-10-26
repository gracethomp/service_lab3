const config = {
  development: {
    username: 'my_app_role',
    password: 'some_password',
    database: 'db',
    port: 5432,
    host: 'db',
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};

export default config;
