const { Pool } = require("pg")
require("dotenv").config()

let pool

// ✅ USE SSL in production (Render)
if (process.env.NODE_ENV === "production") {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  })
} else {
  // ✅ Local development (no SSL needed)
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })
}

// Optional: helpful logging for queries in dev
module.exports = {
  async query(text, params) {
    try {
      const res = await pool.query(text, params)
      if (process.env.NODE_ENV !== "production") {
        console.log("executed query", { text })
      }
      return res
    } catch (error) {
      console.error("error in query", { text })
      throw error
    }
  },
  pool,
}
