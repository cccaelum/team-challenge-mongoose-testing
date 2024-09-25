const express = require('express');
const app = express();
const PORT = 8080;

const { dbConnection } = require('./config/config');
const routes = require('./routes/posts.js');

app.use(express.json());
app.use('/', routes);

// Iniciar la conexión a la base de datos
dbConnection();

// Levantar el servidor solo si no estamos en el entorno de pruebas
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

// Exportar la app para usarla en los tests
module.exports = app;
