require('dotenv').config();

const config = {
  server: process.env.DB_SERVER,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'QLSach',
  database: process.env.DB_NAME,
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
  port: 1433,
}
module.exports = config;