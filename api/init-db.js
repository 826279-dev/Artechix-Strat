console.log("RESET VERSION ACTIVE");
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  try {
    await sql`DROP TABLE IF EXISTS racecalc_users;`;

    await sql`
      CREATE TABLE racecalc_users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    res.status(200).json({ message: "Database reset and initialized" });
    res.status(200).json({ message: "RESET ACTIVE BUILD" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
