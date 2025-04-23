const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Upload ফোল্ডার
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

app.use('/uploads', express.static('uploads'));

app.post('/add-doctor', upload.single('image'), (req, res) => {
  const { name, specialty } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  if (!name || !specialty || !imagePath) {
    return res.status(400).json({ message: 'সব তথ্য পূরণ করুন' });
  }

  res.json({
    message: 'ডক্টর সফলভাবে যোগ হয়েছে!',
    data: { name, specialty, image: imagePath }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
