import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Toate câmpurile sunt obligatorii.' }, { status: 400 })
    }

    await prisma.contactMessage.create({ data: { name, email, message } })

    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (token && chatId) {
      const text = `📩 <b>Mesaj nou de contact Crissval</b>\n\n<b>Nume:</b> ${escapeHtml(name)}\n<b>Email:</b> ${escapeHtml(email)}\n<b>Mesaj:</b> ${escapeHtml(message)}`
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
      }).catch(err => console.error('Telegram send failed', err))
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact API error', error)
    return NextResponse.json({ error: 'Eroare internă server.' }, { status: 500 })
  }
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
