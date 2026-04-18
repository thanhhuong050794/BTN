import { useEffect } from 'react'

const pageStyles = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  background: '#f7f7fb',
}

const cardStyles = {
  width: '100%',
  maxWidth: '520px',
  padding: '2rem',
  borderRadius: '24px',
  background: '#ffffff',
  boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
}

export default function DangNhapPage() {
  useEffect(() => {
    window.location.href = '/DANGNHAP.html'
  }, [])

  return (
    <main style={pageStyles}>
      <section style={cardStyles}>
        <h1 style={{ marginBottom: '0.75rem' }}>Đang chuyển hướng...</h1>
        <p style={{ marginBottom: '1rem', color: '#475569' }}>
          Nếu trang không tự động chuyển, bấm vào liên kết bên dưới.
        </p>
        <a href="/DANGNHAP.html" style={{ color: '#2563eb', fontWeight: 600 }}>
          Mở giao diện đăng nhập cũ
        </a>
      </section>
    </main>
  )
}
