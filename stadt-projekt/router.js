// Importieren von erforderlichen Modulen
const express = require('express');
const path = require('path');
const staedteRoutes = require('./routes/staedte');  // Importiert die Städte-Routen

const router = express.Router();

// Verwendet die Städte-Routen für den Pfad '/staedte'
router.use('/', staedteRoutes);

// HTML-Seite anzeigen
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));  // Sendet die index.html Datei für die Root-Route
});

module.exports = router;  // Exportiert den Router
