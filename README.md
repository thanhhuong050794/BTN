 Đồ án Quản lý Đặt và Giao đồ ăn tại NEU
Chào mừng bạn đến với dự án BTN. Đây là hệ thống hỗ trợ đặt và giao đồ ăn dành riêng cho sinh viên NEU.

Cấu trúc dự án
Dự án được chia làm 2 phần chính:

Backend: Chạy trên Node.js/Express.

Frontend: Chạy trên React (Vite).

Hướng dẫn cài đặt và khởi chạy
Để chạy dự án này ở máy cục bộ (Local), hãy làm theo các bước sau:

1. Tải dự án về máy
Bash
git clone https://github.com/thanhhuong050794/BTN.git
cd BTN
2. Cài đặt và chạy Backend
Mở một terminal mới và thực hiện:

Bash
# Di chuyển vào thư mục backend
cd backend

# Cài đặt các thư viện cần thiết
npm install

# Khởi chạy server
npm start
Server thường sẽ chạy tại địa chỉ: http://localhost:3000

3. Cài đặt và chạy Frontend
Mở một terminal khác (giữ nguyên terminal backend đang chạy) và thực hiện:

Bash
# Di chuyển vào thư mục frontend
cd frontend/myproject

# Cài đặt các thư viện cần thiết
npm install

# Khởi chạy ứng dụng giao diện
npm run dev
Sau khi chạy, bạn nhấn vào đường link hiện ra ở terminal (thường là http://localhost:5173) để mở trang web.

Công nghệ sử dụng
Frontend: React.js, Vite, CSS.

Backend: Node.js, Express,

Deployment: Render.

 Link truy cập trực tuyến
Bạn có thể trải nghiệm phiên bản đã deploy tại:

Trang chủ: https://dat-va-giao-do-an-tai-neu.onrender.com/