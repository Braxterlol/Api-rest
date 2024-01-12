require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;


const alumnosRouter = require('./src/routes/alumnos.route');


app.use('/alumnos', alumnosRouter);


app.listen(PORT, () => {
    console.log(`API escuchando en el puerto ${PORT}`);
});