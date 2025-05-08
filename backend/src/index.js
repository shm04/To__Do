const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { config } = require('./config');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(config.dbUri)
    .then(() => {
        app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
    })
    .catch((err) => console.error("Error al conectar a la DB", err));
