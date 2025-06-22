const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
require('./config/db');

const authRoutes = require('./Routes/UserRoute');
const propertyRoutes = require('./Routes/PropertyRoute');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('Welcome to the Real Estate API'));
app.use('/api/user', authRoutes);
app.use('/api/property', propertyRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
