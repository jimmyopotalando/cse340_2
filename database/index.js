// database/index.js
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Important for Render-hosted databases
  },
});

module.exports = pool;

  