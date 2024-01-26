const app = require('../../src/app');
const port = process.env.PORT || 3000;

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB verbunden');
}).catch(err => {
  console.error('Verbindungsfehler', err.message);
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
