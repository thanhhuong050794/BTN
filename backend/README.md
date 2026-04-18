# NEU Food Backend

Backend server cho ứng dụng NEU Food với tích hợp AI chat và OAuth authentication.

## Cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Sao chép file cấu hình:
```bash
cp .env.example .env
```

3. Cấu hình các biến môi trường trong `.env`:
   - **OpenRouter API**: Lấy API key từ [OpenRouter](https://openrouter.ai/)
   - **Google OAuth**: Lấy từ [Google Cloud Console](https://console.cloud.google.com/)
   - **GitHub OAuth**: Lấy từ [GitHub Developer Settings](https://github.com/settings/developers)

## Cấu hình OAuth

### Google OAuth
1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới hoặc chọn project hiện có
3. Kích hoạt "Google Identity Services API"
4. Tạo OAuth 2.0 Client ID:
   - Application type: Web application
   - Authorized JavaScript origins: `http://localhost:3000`
   - Authorized redirect URIs: `http://localhost:3000/auth/google/callback`
5. Sao chép Client ID và Client Secret vào `.env`

### GitHub OAuth
1. Truy cập [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Điền thông tin:
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/auth/github/callback`
4. Sao chép Client ID và Client Secret vào `.env`

## Chạy server

```bash
npm start
```

Server sẽ chạy tại `http://localhost:3000`

## API Endpoints

### Authentication
- `GET /auth/google` - Đăng nhập với Google
- `GET /auth/google/callback` - Callback từ Google
- `GET /auth/github` - Đăng nhập với GitHub
- `GET /auth/github/callback` - Callback từ GitHub
- `GET /api/user` - Lấy thông tin user hiện tại
- `POST /api/logout` - Đăng xuất

### Chat
- `POST /api/chat` - Gửi tin nhắn chat với AI
- `POST /api/reset` - Reset lịch sử chat

## Cấu trúc file

- `server.js` - Main server file
- `chat.json` - Lịch sử chat
- `users.json` - Thông tin users (tạo tự động)
- `.env` - Cấu hình môi trường (không commit)