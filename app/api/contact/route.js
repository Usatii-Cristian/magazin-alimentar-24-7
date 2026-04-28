import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request) {
  try {
    const { name, email, phone, message } = await request.json()

    if (!name || !phone || !message) {
      return NextResponse.json({ error: 'Numele, telefonul și mesajul sunt obligatorii.' }, { status: 400 })
    }

    const created = await prisma.contactMessage.create({
      data: { name, email: email?.trim() || null, phone: phone?.trim() || null, message },
    })

    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (token && chatId) {
      const now = new Date()
      const date = now.toLocaleDateString('ro-RO', { timeZone: 'Europe/Chisinau' })
      const time = now.toLocaleTimeString('ro-RO', { timeZone: 'Europe/Chisinau', hour: '2-digit', minute: '2-digit' })

      const text = [
        `📩 <b>Mesaj nou de contact – Crissval</b>`,
        ``,
        `📅 <b>Data:</b> ${date}  🕐 <b>Ora:</b> ${time}`,
        `👤 <b>Nume:</b> ${escapeHtml(name)}`,
        email ? `📧 <b>Email:</b> ${escapeHtml(email)}` : null,
        phone ? `📱 <b>Telefon:</b> ${escapeHtml(phone)}` : null,
        ``,
        `💬 <b>Mesaj:</b>`,
        escapeHtml(message),
        ``,
        `<b>Status:</b> ⏳ În așteptare`,
      ].filter(line => line !== null).join('\n')

      const reply_markup = {
        inline_keyboard: [
          [
            { text: '✅ Contactat', callback_data: `contact:yes:${created.id}` },
            { text: '❌ Necontactat', callback_data: `contact:no:${created.id}` },
          ],
        ],
      }

      const privateChatId = process.env.TELEGRAM_PRIVATE_CHAT_ID
      const targets = [chatId, privateChatId].filter(Boolean)

      await Promise.all(
        targets.map(id =>
          fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: id, text, parse_mode: 'HTML', reply_markup }),
          }).catch(err => console.error(`Telegram send failed for ${id}`, err))
        )
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact API error', error)
    return NextResponse.json({ error: 'Eroare internă server.' }, { status: 500 })
  }
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
