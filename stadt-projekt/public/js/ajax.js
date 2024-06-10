import { dom } from './dom.js';
import { renderStaedte } from './render.js';

// Funktion zum Laden der Städte
export async function loadStaedte() {
    const response = await fetch('/staedte');  // Sendet eine GET-Anfrage an den Server
    const staedte = await response.json();  // Parst die Antwort als JSON
    const container = dom.$('#staedte-container');  // Holt das Container-Element
    container.innerHTML = '';  // Leert das Container-Element
    renderStaedte(container, staedte);  // Rendert die Städte
}

// Funktion zum Hinzufügen einer neuen Stadt
export async function addStadt(event) {
    event.preventDefault();  // Verhindert das Standard-Formularverhalten
    const name = dom.$('#name').value;
    const kennzeichen = dom.$('#kennzeichen').value;
    const land = dom.$('#land').value;
    const einwohner = dom.$('#einwohner').value;

    const stadt = { name, kennzeichen, land, einwohner: parseInt(einwohner) };  // Erstellt ein neues Stadt-Objekt

    const response = await fetch('/staedte', {
        method: 'POST',  // Sendet eine POST-Anfrage an den Server
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stadt)  // Sendet die Stadt-Daten als JSON
    });

    if (response.ok) {  // Wenn die Anfrage erfolgreich war
        loadStaedte();  // Lädt die Städte neu
    }
}

// Funktion zum Löschen einer Stadt
export async function deleteStadt(id, rev) {
    const response = await fetch(`/staedte/${id}?rev=${rev}`, { method: 'DELETE' });  // Sendet eine DELETE-Anfrage an den Server
    if (response.ok) {  // Wenn die Anfrage erfolgreich war
        loadStaedte();  // Lädt die Städte neu
    }
}

// Funktion zum Suchen von Städten
export async function searchStadt() {
    const query = dom.$('#search').value.toLowerCase();  // Holt den Suchbegriff
    const response = await fetch('/staedte');  // Sendet eine GET-Anfrage an den Server
    const staedte = await response.json();  // Parst die Antwort als JSON
    const container = dom.$('#staedte-container');  // Holt das Container-Element
    container.innerHTML = '';  // Leert das Container-Element

    const filteredStaedte = staedte.filter(stadt => stadt.name.toLowerCase().includes(query));  // Filtert die Städte nach dem Suchbegriff
    renderStaedte(container, filteredStaedte);  // Rendert die gefilterten Städte
}
