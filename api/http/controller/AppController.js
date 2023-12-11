// Funktion für die Startseite
exports.index = (req, res) => {
    res.render('2', { title: 'Meine App', name: 'Kevin' });
};