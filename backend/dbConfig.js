require('dotenv').config();

const config = {
  server: process.env.DB_SERVER,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'QLSachs',
  pool: {
    min: 0,
    max: 10,
    idleTimeoutMillis: 3000000
  },
  options: {
    trustedConnection: true,
    enableArithPort: true,
    trustServerCertificate: true,
    instancename: 'DESKTOP-JEDQHDP'
  },
  port: 1433

}
module.exports = config;