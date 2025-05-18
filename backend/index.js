const express = require("express");
const cors = require("cors");
const proyectosRouter = require("./routes/proyectos");
const ciclosRouter = require("./routes/ciclos");
const seguridadRouter = require("./routes/seguridad");

// creación del servidor 
const app = express();
app.use(express.json()); 
app.use(
    cors({
        origin: "*", 
    })
);

// creación de la bd si no existe
require("./base-orm/sqlite-init");  

// uso de routers
app.use(proyectosRouter);
app.use(ciclosRouter);
app.use(seguridadRouter);

// rutas definidas
app.get("/", (req, res) => {
    res.status(200).send("Backend inicial!");
});

app.get('/_isalive', (req, res) => {
    res.status(200).send(`Ejecutándose desde: ${app.locals.fechaInicio}`);
});

// middleware para manejar rutas no encontradas
app.use((req, res) => {
    res.status(404).send("URL no encontrada!");
});

// arranque del servidor
if (!module.parent) {   
    const port = process.env.PORT || 3000;   
    app.locals.fechaInicio = new Date();
    app.listen(port, () => {
        console.log(`sitio escuchando en el puerto ${port}`);
    });
}

// exportación para testing
module.exports = app; 