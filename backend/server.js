const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes files
const vehicleRoutes = require('./routes/vehicleRoutes');
const ownerRoutes = require('./routes/ownerRoutes');
const insuranceRoutes = require('./routes/insuranceRoutes');
const linkRoutes = require('./routes/linkRoutes');
const verificationRoutes = require('./routes/verificationRoutes');

// Mount routers
app.use('/vehicle/verify', verificationRoutes); // Mount this before generic /vehicle to avoid route clashing
app.use('/vehicle', vehicleRoutes);
app.use('/owner', ownerRoutes);
app.use('/insurance', insuranceRoutes);
app.use('/link', linkRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Server Error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
