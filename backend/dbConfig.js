require('dotenv').config();

const config = {
  server: process.env.DB_SERVER_FOUR,
  user: process.env.DB_USER_FOUR,
  // user: process.env.DB_USER_THREE,
  password: process.env.DB_PASS_FOUR,
  // password: process.env.DB_PASS_THREE,
  database: 'QLSach',
  // database: process.env.DB_NAME_FOUR,
  dialect: "mssql",
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
    instancename: 'MSSQLSERVER'
  },
  port: 1433

}
module.exports = config;