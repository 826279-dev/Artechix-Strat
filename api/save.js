export default function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const data = req.body;

  // TEMP STORAGE (we will upgrade to database next step)
  global.strategies = global.strategies || [];
  global.strategies.push(data);

  return res.status(200).json({
    message: "Strategy saved",
    total: global.strategies.length
  });
}
