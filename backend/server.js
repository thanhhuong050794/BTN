const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')
require('dotenv').config()

const app = express()
const FILE_PATH = path.join(__dirname, 'chat.json')

app.use(
  cors({
    origin: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  }),
)
app.use(express.json())

let chatHistory = []

if (fs.existsSync(FILE_PATH)) {
  try {
    const raw = fs.readFileSync(FILE_PATH, 'utf-8')
    chatHistory = JSON.parse(raw || '[]')
    if (!Array.isArray(chatHistory)) chatHistory = []
  } catch {
    chatHistory = []
  }
}

function saveChat() {
  fs.writeFileSync(FILE_PATH, JSON.stringify(chatHistory, null, 2))
}

app.post('/api/reset', (req, res) => {
  chatHistory = []
  saveChat()
  res.json({ ok: true, message: 'Đã reset' })
})

app.post('/api/chat', async (req, res) => {
  try {
    const userMessage = String(req.body?.message ?? '').trim()
    if (!userMessage) {
      return res.status(400).json({ error: 'Thiếu nội dung tin nhắn' })
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return res.status(500).json({
        reply:
          'Server chưa cấu hình GEMINI_API_KEY. Tạo file .env trong thư mục backend với dòng GEMINI_API_KEY=khóa_của_bạn',
      })
    }

    chatHistory.push({
      role: 'user',
      parts: [{ text: userMessage }],
    })

    const recentHistory = chatHistory.slice(-20)

    const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash'
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: recentHistory }),
    })

    const data = await response.json()

    if (!response.ok) {
      const errText = data?.error?.message || JSON.stringify(data)
      console.error('Gemini API:', errText)
      return res.status(500).json({
        reply: `Lỗi AI: ${data?.error?.message || 'Không gọi được dịch vụ'}`,
      })
    }

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text || 'Không có phản hồi'

    chatHistory.push({
      role: 'model',
      parts: [{ text: reply }],
    })

    saveChat()
    res.json({ reply })
  } catch (e) {
    console.error(e)
    res.status(500).json({ reply: 'Lỗi máy chủ. Thử lại sau.' })
  }
})

const PORT = Number(process.env.PORT) || 3000
app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`)
})
