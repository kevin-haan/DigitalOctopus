const app = require('../../src/app'); // Importiere die Express-App
const port = process.env.PORT || 3000;

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB verbunden');
}).catch(err => {
  console.error('Verbindungsfehler', err.message);
});

// Starte den Server
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
