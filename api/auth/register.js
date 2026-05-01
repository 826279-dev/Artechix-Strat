import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { email, password } = body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing email or password' });
    }

    await sql`
      INSERT INTO racecalc_users (email, password)
      VALUES (${email}, ${password});
    `;

    return res.status(200).json({ message: 'User created' });

  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'User may already exist' });
  }
}
