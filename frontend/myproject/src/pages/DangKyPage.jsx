import { Link } from 'react-router-dom'

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

const buttonStyles = {
  width: '100%',
  padding: '0.95rem 1rem',
  borderRadius: '999px',
  border: 'none',
  marginBottom: '0.75rem',
  fontSize: '1rem',
  cursor: 'pointer',
}

export default function DangKyPage() {
  const openAuth = (provider) => {
    const next = `${window.location.pathname}${window.location.search}${window.location.hash}` || '/'
    const returnTo = `${window.location.origin}/oauth/callback?next=${encodeURIComponent(next)}&provider=${encodeURIComponent(provider)}`
    window.location.href = `http://localhost:3000/auth/${provider}?returnTo=${encodeURIComponent(returnTo)}`
  }

  return (
    <main style={pageStyles}>
      <section style={cardStyles}>
        <h1 style={{ marginBottom: '0.75rem' }}>Đăng ký</h1>
        <p style={{ marginBottom: '1.75rem', color: '#475569' }}>
          Tạo tài khoản mới bằng Google, GitHub hoặc mở biểu mẫu đăng ký cũ.
        </p>

        <button
          type="button"
          style={{ ...buttonStyles, background: '#1a73e8', color: '#fff' }}
          onClick={() => openAuth('google')}
        >
          Đăng ký bằng Google
        </button>
        <button
          type="button"
          style={{ ...buttonStyles, background: '#111827', color: '#fff' }}
          onClick={() => openAuth('github')}
        >
          Đăng ký bằng GitHub
        </button>

        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ color: '#475569' }}>Đã có tài khoản?</span>
          <Link to="/dang-nhap" style={{ color: '#2563eb', fontWeight: 600 }}>
            Đăng nhập
          </Link>
        </div>

        <div style={{ marginTop: '1.75rem', padding: '1rem', borderRadius: '16px', background: '#f1f5f9' }}>
          <p style={{ marginBottom: '0.75rem' }}>
            Hoặc sử dụng biểu mẫu đăng ký cũ để tiếp tục.
          </p>
          <a href="/DANGKY.html" style={{ color: '#2563eb', fontWeight: 600 }}>
            Mở giao diện đăng ký cũ
          </a>
        </div>
      </section>
    </main>
  )
}
