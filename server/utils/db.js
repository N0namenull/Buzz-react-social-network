require('dotenv').config();
const Pool = require('pg').Pool;


const pool = new Pool({
   user: 'postgres',
   password: '1488',
   host: 'localhost',
   port: 5432,
   database: 'social',
});

module.exports = pool;
