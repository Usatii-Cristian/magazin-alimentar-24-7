import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request) {
  try {
    const { name, email, phone, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Toate câmpurile sunt obligatorii.' }, { status: 400 })
    }

    await prisma.contactMessage.create({
      data: { name, email, phone: phone?.trim() || null, message },
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
        `📧 <b>Email:</b> ${escapeHtml(email)}`,
        phone ? `📱 <b>Telefon:</b> ${escapeHtml(phone)}` : null,
        ``,
        `💬 <b>Mesaj:</b>`,
        escapeHtml(message),
      ].filter(line => line !== null).join('\n')

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
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
