const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const authRouters = require('./routes/auth.routes');
const userRouters = require('./routes/user.routes');
const app = express();// Chemin vers votre fichier


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouters);
app.use('/api/user', userRouters);
const emailRoutes = require("./routes/email.routes");
app.use('/api/email', emailRoutes);

const paymentRoutes = require('./routes/payment.routes');
app.use('/api/payment', paymentRoutes);



mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to database');
    })
    .catch(err => {
        console.log(err);
    });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    
});

