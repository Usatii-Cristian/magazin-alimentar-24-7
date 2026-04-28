import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request) {
  try {
    const secret = process.env.TELEGRAM_WEBHOOK_SECRET
    if (secret) {
      const header = request.headers.get('x-telegram-bot-api-secret-token')
      if (header !== secret) {
        return NextResponse.json({ ok: false }, { status: 401 })
      }
    }

    const update = await request.json()
    const cb = update.callback_query
    if (!cb) return NextResponse.json({ ok: true })

    const token = process.env.TELEGRAM_BOT_TOKEN
    if (!token) return NextResponse.json({ ok: true })

    fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ callback_query_id: cb.id }),
    }).catch(() => {})

    const parts = String(cb.data || '').split(':')
    const action = parts[0]
    const value = parts[1]
    const id = parts[2]
    const prevContact = parts[3]
    const chatId = cb.message?.chat?.id
    const messageId = cb.message?.message_id

    if (!id || !chatId || !messageId) return NextResponse.json({ ok: true })

    let contact
    try {
      contact = await prisma.contactMessage.findUnique({ where: { id } })
    } catch {
      contact = null
    }
    if (!contact) return NextResponse.json({ ok: true })

    const baseText = buildBaseText(contact)

    if (action === 'contact') {
      const status = value === 'yes' ? '✅ Contactat' : '❌ Necontactat'
      const newText = `${baseText}\n\n<b>Status:</b> ${status}`
      const cFlag = value === 'yes' ? 'cy' : 'cn'

      const reply_markup = {
        inline_keyboard: [
          [
            { text: '📦 Livrat', callback_data: `delivery:yes:${id}:${cFlag}` },
            { text: '🚫 Nelivrat', callback_data: `delivery:no:${id}:${cFlag}` },
          ],
        ],
      }

      await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          message_id: messageId,
          text: newText,
          parse_mode: 'HTML',
          reply_markup,
        }),
      }).catch(err => console.error('editMessageText failed', err))
    } else if (action === 'delivery') {
      const contactStatus = prevContact === 'cy' ? '✅ Contactat' : '❌ Necontactat'
      const deliveryStatus = value === 'yes' ? '📦 Livrat' : '🚫 Nelivrat'
      const newText = `${baseText}\n\n<b>Status:</b> ${contactStatus}\n<b>Livrare:</b> ${deliveryStatus}`

      await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          message_id: messageId,
          text: newText,
          parse_mode: 'HTML',
        }),
      }).catch(err => console.error('editMessageText failed', err))
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Telegram webhook error', error)
    return NextResponse.json({ ok: true })
  }
}

function buildBaseText(contact) {
  const date = contact.createdAt.toLocaleDateString('ro-RO', { timeZone: 'Europe/Chisinau' })
  const time = contact.createdAt.toLocaleTimeString('ro-RO', { timeZone: 'Europe/Chisinau', hour: '2-digit', minute: '2-digit' })

  return [
    `📩 <b>Mesaj nou de contact – Crissval</b>`,
    ``,
    `📅 <b>Data:</b> ${date}  🕐 <b>Ora:</b> ${time}`,
    `👤 <b>Nume:</b> ${escapeHtml(contact.name)}`,
    contact.email ? `📧 <b>Email:</b> ${escapeHtml(contact.email)}` : null,
    contact.phone ? `📱 <b>Telefon:</b> ${escapeHtml(contact.phone)}` : null,
    ``,
    `💬 <b>Mesaj:</b>`,
    escapeHtml(contact.message),
  ].filter(line => line !== null).join('\n')
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
