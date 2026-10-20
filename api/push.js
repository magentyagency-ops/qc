// Relais Pushover : les clés restent côté serveur (variables d'environnement Vercel)
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST uniquement' });
  const { title = 'Zoom Écran', message = '' } = req.body || {};
  if (!message) return res.status(400).json({ error: 'message vide' });
  const r = await fetch('https://api.pushover.net/1/messages.json', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // Pushover limite le message à 1024 caractères
    body: JSON.stringify({ token: process.env.PUSHOVER_TOKEN, user: process.env.PUSHOVER_USER,
      title: String(title).slice(0, 250), message: String(message).slice(0, 1024) })
  });
  res.status(r.status).json(await r.json());
}
