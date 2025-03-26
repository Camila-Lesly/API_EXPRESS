// Importamos el módulo http de Node.js para crear el servidor
const http = require('http');

// Importamos la configuración de la aplicación Express (app.js)
const app = require('./app');

// Definimos el puerto donde escuchará el servidor, por defecto 5000
const port = process.env.PORT || 5000;

// Le decimos a Express qué puerto debe usar
app.set('port', port);

// Creamos el servidor HTTP que utilizará nuestra aplicación Express
const server = http.createServer(app);

// Hacemos que el servidor escuche las solicitudes en el puerto especificado
server.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
