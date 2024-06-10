// Importieren von erforderlichen Modulen
const express = require('express');
const db = require('../db');  // Importiert die Datenbank-Verbindung
const router = express.Router();

// Route zum Abrufen der Städte
router.get('/', async (req, res) => {
    try {
        const result = await db.list({ include_docs: true });  // Ruft alle Dokumente aus der Datenbank ab
        const staedte = result.rows.map(row => row.doc);  // Extrahiert die Dokumente
        res.json(staedte);  // Sendet die Städte als JSON zurück
    } catch (error) {
        res.status(500).send(error);  // Sendet bei Fehler einen 500 Status und die Fehlermeldung
    }
});

// Route zum Hinzufügen einer neuen Stadt
router.post('/', async (req, res) => {
    try {
        const stadt = req.body;  // Holt die Stadt-Daten aus der Anfrage
        await db.insert(stadt);  // Fügt die neue Stadt in die Datenbank ein
        res.status(201).send('Stadt hinzugefügt');  // Sendet eine Erfolgsnachricht zurück
    } catch (error) {
        res.status(500).send(error);  // Sendet bei Fehler einen 500 Status und die Fehlermeldung
    }
});

// Route zum Löschen einer Stadt
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;  // Holt die ID aus den URL-Parametern
        const rev = req.query.rev;  // Holt die Rev aus den Query-Parametern
        await db.destroy(id, rev);  // Löscht die Stadt aus der Datenbank
        res.status(200).send('Stadt gelöscht');  // Sendet eine Erfolgsnachricht zurück
    } catch (error) {
        res.status(500).send(error);  // Sendet bei Fehler einen 500 Status und die Fehlermeldung
    }
});

module.exports = router;  // Exportiert den Router
