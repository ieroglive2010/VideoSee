const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Настройка хранения файлов
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Добавляем временную метку к имени файла
    }
});

const upload = multer({ storage });

// Парсинг URL-encoded данных
app.use(express.urlencoded({ extended: true }));

// Обработка POST-запроса для регистрации
app.post('/register', upload.single('avatar'), (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password; // Не забудьте хэшировать пароль!
    const avatar = req.file.path; // Путь к загруженной аватарке
    const registrationDate = new Date().toLocaleDateString();

    // Здесь вы должны сохранить данные пользователя в базе данных

    // Перенаправление на главную страницу после успешной регистрации
    res.redirect('/index.html?username=' + encodeURIComponent(username) + '&avatar=' + encodeURIComponent(avatar) + '&date=' + encodeURIComponent(registrationDate));
});

app.listen(port, () => {
    console.log(Сервер работает на http://localhost:${port});
});
