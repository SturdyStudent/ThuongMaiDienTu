require('dotenv').config();

const config = {
  // server: process.env.DB_SERVER_TWO,
  server: process.env.DB_SERVER_THREE,

  // user: process.env.DB_USER,

  user: process.env.DB_USER_THREE,

  // password: process.env.DB_PASS,

  password: process.env.DB_PASS_THREE,

  database: 'QLSach',
  // database: process.env.DB_NAME,
  pool: {
    min: 0,
    max: 10,
    idleTimeoutMillis: 3000000
  },
  options: {
    trustedConnection: true,
    enableArithPort: true,
    trustServerCertificate: true,
    // instancename: 'DESKTOP-JEDQHDP'
    // instancename: 'LOCALIZE'
  },
  port: 1433,
  port: 44300,
  port: 44399,

}
module.exports = config;