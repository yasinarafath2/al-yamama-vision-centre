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
// Step 1: Dummy doctor data
const doctors = {
  "1": {
    name: "ডা. ইলিয়াস হোসেন",
    specialty: "চোখের সার্জন (Retina Specialist)",
    photo: "uploads/uploads/doctor1.jpg",
    appointments: [
      "10:00 AM - আব্দুল্লাহ",
      "11:30 AM - রাবেয়া খাতুন",
      "1:00 PM - হোসেন মিয়া"
    ]
  }
};

// Step 2: এই লাইনটা server.js এর নিচে বসাও
app.get('/api/doctor/:id', (req, res) => {
  const doctorId = req.params.id;
  const doctor = doctors[doctorId];

  if (doctor) {
    res.json(doctor); // ডাটা পাঠানো
  } else {
    res.status(404).json({ error: "Doctor not found" });
  }
});
