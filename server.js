const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const homeRoutes = require('./routes/homeRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const projectRoutes = require('./routes/projectRoutes')
const contactRoutes = require('./routes/contactRoutes')
const profileRoutes = require('./routes/profileRoutes')
const serviceOfferingRoutes = require('./routes/serviceOfferingRoutes')

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "https://rakesh-portfolio-eths.onrender.com"],
    credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Register Routes
app.use('/api/home', homeRoutes);
app.use('/api/about', aboutRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/profile", profileRoutes);
app.use('/api/services', serviceOfferingRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.error('Database connection error:', err));