import { dom } from './dom.js';
import { deleteStadt } from './ajax.js';

// Funktion zum Rendern der Städte
export function renderStaedte(container, staedte) {
    staedte.forEach(stadt => {
        const card = dom.create('div', { class: 'col-md-4 mb-3' },
            dom.create('div', { class: 'card' },
                dom.create('div', { class: 'card-body' },
                    dom.create('h5', { class: 'card-title' }, stadt.name),
                    dom.create('p', { class: 'card-text' }, `Kennzeichen: ${stadt.kennzeichen}`),
                    dom.create('p', { class: 'card-text' }, `Land: ${stadt.land}`),
                    dom.create('p', { class: 'card-text' }, `Einwohner: ${stadt.einwohner}`),
                    dom.create('button', {
                        class: 'btn btn-danger',
                        onclick: () => deleteStadt(stadt._id, stadt._rev)  // Bindet die deleteStadt Funktion an den Button
                    }, 'Löschen')
                )
            )
        );
        container.appendChild(card);  // Fügt die Karte dem Container hinzu
    });
}
