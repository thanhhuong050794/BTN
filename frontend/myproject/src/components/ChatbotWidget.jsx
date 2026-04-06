import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './ChatbotWidget.module.css'

const API_BASE = import.meta.env.VITE_CHAT_API_URL ?? ''

export default function ChatbotWidget() {
  const { pathname } = useLocation()
  const hasBottomDock = ['/', '/menu', '/gio-hang'].includes(pathname)
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const listRef = useRef(null)

  useEffect(() => {
    if (!open || !listRef.current) return
    listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, open])

  const postJson = useCallback(async (path, body) => {
    const url = `${API_BASE}${path}`
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body != null ? JSON.stringify(body) : undefined,
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      throw new Error(data.error || data.reply || `Lỗi ${res.status}`)
    }
    return data
  }, [])

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', text }])
    setLoading(true)
    try {
      const data = await postJson('/api/chat', { message: text })
      const reply = data.reply ?? 'Không có phản hồi'
      setMessages((prev) => [...prev, { role: 'bot', text: reply }])
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          text: e.message || 'Không gửi được tin. Chạy backend và cấu hình GEMINI_API_KEY.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }, [input, loading, postJson])

  const resetChat = useCallback(async () => {
    if (!window.confirm('Bạn có chắc muốn xóa toàn bộ đoạn chat?')) return
    try {
      await postJson('/api/reset')
      setMessages([])
    } catch {
      setMessages([])
    }
  }, [postJson])

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div
      className={styles.root}
      style={{
        '--chat-bottom': hasBottomDock ? '5.75rem' : '1.25rem',
      }}
    >
      {open ? (
        <div
          className={styles.panel}
          role="dialog"
          aria-label="Trợ lý NEUFood"
        >
          <header className={styles.head}>
            <div className={styles.headTitle}>
              <span className={styles.headBadge}>AI</span>
              <div>
                <p className={styles.headName}>Trợ lý NEUFood</p>
                <p className={styles.headSub}>Hỏi về menu, đặt món, giao hàng</p>
              </div>
            </div>
            <div className={styles.headActions}>
              <button
                type="button"
                className={styles.iconBtn}
                onClick={resetChat}
                title="Xóa lịch sử chat"
                aria-label="Xóa lịch sử chat"
              >
                <span className="material-symbols-outlined">delete_sweep</span>
              </button>
              <button
                type="button"
                className={styles.iconBtn}
                onClick={() => setOpen(false)}
                title="Đóng"
                aria-label="Đóng khung chat"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </header>

          <div className={styles.messages} ref={listRef}>
            {messages.length === 0 && !loading && (
              <p className={styles.hint}>
                Chào bạn! Hỏi gợi ý món, giờ giao, hoặc cách đặt hàng nhé.
              </p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === 'user' ? styles.bubbleUser : styles.bubbleBot
                }
              >
                <span className={styles.bubbleLabel}>
                  {m.role === 'user' ? 'Bạn' : 'Bot'}
                </span>
                <p className={styles.bubbleText}>{m.text}</p>
              </div>
            ))}
            {loading && (
              <p className={styles.thinking} aria-live="polite">
                Đang trả lời…
              </p>
            )}
          </div>

          <div className={styles.compose}>
            <input
              className={styles.input}
              type="text"
              placeholder="Nhập câu hỏi…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              disabled={loading}
              aria-label="Nội dung tin nhắn"
            />
            <button
              type="button"
              className={styles.sendBtn}
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              aria-label="Gửi"
            >
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        className={styles.fab}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? 'Đóng trợ lý AI' : 'Mở trợ lý AI NEUFood'}
      >
        <img
          className={styles.fabImg}
          src="/linhvat.png"
          alt=""
          width={72}
          height={72}
          decoding="async"
        />
      </button>
    </div>
  )
}
