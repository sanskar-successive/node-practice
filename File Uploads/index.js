const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

const app = express();
const port = 3001;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit file size to 5 MB
  },
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|gif/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Only image files are allowed!');
    }
  },
});

app.get('/', (req, res) => {
  const files = fs.readdirSync(path.join(__dirname, 'uploads'));
  res.render('index', { files });
});

app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully!');
});

app.get('/download/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);
  res.download(filePath);
});

app.get('/files', (req, res) => {
  const files = fs.readdirSync(path.join(__dirname, 'uploads'));
  res.json(files);
});

app.delete('/files/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);
  fs.unlinkSync(filePath);
  res.send('File deleted successfully!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
