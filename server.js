const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log('====================================');
    console.log(`Servidor local iniciado.`);
    console.log(`La app está corriendo en el puerto: ${PORT}`);
    console.log(`Abre http://localhost:${PORT} en tu navegador web.`);
    console.log('====================================');
});
