const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let doctors = [
  {
    id: 1,
    name: 'Dr. Ayesha Rahman',
    specialty: 'Ophthalmologist',
    image: 'https://via.placeholder.com/100',
    startTime: '12:00',
    endTime: '17:00'
  },
  {
    id: 2,
    name: 'Dr. Omar Hossain',
    specialty: 'Eye Surgeon',
    image: 'https://via.placeholder.com/100',
    startTime: '12:00',
    endTime: '17:00'
  }
];

app.get('/api/doctors', (req, res) => {
  res.json(doctors);
});

app.put('/api/doctors/:id', (req, res) => {
  const doctorId = parseInt(req.params.id);
  const { startTime, endTime } = req.body;

  doctors = doctors.map(doc =>
    doc.id === doctorId ? { ...doc, startTime: startTime || doc.startTime, endTime: endTime || doc.endTime } : doc
  );

  res.json({ message: 'Schedule updated successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});