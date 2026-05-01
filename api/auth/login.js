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

    const result = await sql`
      SELECT * FROM racecalc_users
      WHERE email = ${email} AND password = ${password};
    `;

    if (result.rows.length > 0) {
      return res.status(200).json({ success: true });
    }

    return res.status(401).json({ error: 'Invalid credentials' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
}
