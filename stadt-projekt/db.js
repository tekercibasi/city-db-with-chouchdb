// Importieren von erforderlichen Modulen
const nano = require('nano');
const { dbUrl } = require('./settings');
const { username, password } = require('./credentials');

// Verbindet sich mit der CouchDB
const couch = nano(`http://${username}:${password}@${dbUrl}`);
const dbName = 'staedte';  // Name der Datenbank
const db = couch.use(dbName);  // Verwendet die Datenbank

// Initialisierung der Datenbank
async function initDb() {
    try {
        const dbList = await couch.db.list();  // Listet alle Datenbanken auf
        if (!dbList.includes(dbName)) {  // Prüft, ob die Datenbank existiert
            await couch.db.create(dbName);  // Erstellt die Datenbank, falls sie nicht existiert
            console.log(`Datenbank ${dbName} erstellt`);
        }
    } catch (error) {
        console.error('Fehler beim Initialisieren der Datenbank:', error);  // Loggt Fehler
    }
}

initDb();  // Führt die Initialisierung aus

module.exports = db;  // Exportiert die Datenbank-Verbindung
