import { loadStaedte, addStadt, deleteStadt, searchStadt } from './ajax.js';  // Importiert die AJAX-Funktionen

document.addEventListener('DOMContentLoaded', () => {
    loadStaedte();  // Lädt die Städte, sobald die DOM vollständig geladen ist
});

window.addStadt = addStadt;  // Bindet die addStadt Funktion an das globale Fenster-Objekt
window.deleteStadt = deleteStadt;  // Bindet die deleteStadt Funktion an das globale Fenster-Objekt
window.searchStadt = searchStadt;  // Bindet die searchStadt Funktion an das globale Fenster-Objekt
