const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const FILE_PATH = "chat.json";

// Đọc lịch sử khi server start
let chatHistory = [];

if (fs.existsSync(FILE_PATH)) {
  const data = fs.readFileSync(FILE_PATH, "utf-8");
  chatHistory = JSON.parse(data || "[]");
}

// Hàm lưu file
function saveChat() {
  fs.writeFileSync(FILE_PATH, JSON.stringify(chatHistory, null, 2));
}

// API chat
app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;
  // Thêm câu hỏi vào lịch sử
  chatHistory.push({
    role: "user",
    parts: [{ text: userMessage }]
  });
  // API reset
  app.post("/api/reset", (req, res) => {
    chatHistory = [];
    saveChat();
    res.json({ message: "Đã reset" });
  });

  // Chỉ lấy 10 tin gần nhất 
  const recentHistory = chatHistory.slice(-10);

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBQT63kWX3mYULpaXWpoXWBzkYHuxtnSvc",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: recentHistory
      })
    }
  );

  const data = await response.json();

  const reply =
    data.candidates?.[0]?.content?.parts?.[0]?.text || "Không có phản hồi";

  // Thêm câu trả lời vào lịch sử
  chatHistory.push({
    role: "model",
    parts: [{ text: reply }]
  });

  // Lưu vào file
  saveChat();

  res.json({ reply });
});

app.listen(3000, () => {
  console.log("Server chạy tại http://localhost:3000");
});