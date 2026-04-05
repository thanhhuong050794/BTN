const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello từ backend!');
});

app.listen(5000, () => {
    console.log('Server chạy tại http://localhost:5000');
});