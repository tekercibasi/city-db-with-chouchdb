// Importieren von erforderlichen Modulen
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./router');  // Importiert den Router, der die Routen für die Städte behandelt

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());  // Middleware zum Parsen von JSON-Anfragen
app.use(bodyParser.urlencoded({ extended: true }));  // Middleware zum Parsen von URL-codierten Anfragen
app.use(express.static(path.join(__dirname, 'public')));  // Stellt statische Dateien aus dem Verzeichnis 'public' bereit

// Routen
app.use('/staedte', router);  // Verwendet den Router für alle Anfragen an '/staedte'

// HTML-Seite anzeigen
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));  // Sendet die index.html Datei für die Root-Route
});

// Server starten
app.listen(port, () => {
    console.log(`Server läuft unter http://localhost:${port}`);  // Startet den Server und gibt die URL aus
});
