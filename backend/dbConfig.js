require('dotenv').config();

const config = {
  server: process.env.DB_SERVER,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  pool: {
    min: 0,
    max: 10,
    idleTimeoutMillis: 3000000
  },
  options: {
    encrypt:false,
    trustedConnection: true,
    enableArithPort: true,
    trustServerCertificate: true,
    instancename: process.env.DB_SERVER
  },
  port: 1433
}
module.exports = config;