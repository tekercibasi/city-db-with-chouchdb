export const dom = {
    // Funktion zum Erstellen eines neuen DOM-Elements
    create(tag, attrs = {}, ...children) {
        const element = document.createElement(tag);  // Erstellt ein neues Element
        for (let [key, value] of Object.entries(attrs)) {
            if (key.startsWith('on') && typeof value === 'function') {
                element.addEventListener(key.substring(2).toLowerCase(), value);  // Fügt Event-Listener hinzu
            } else {
                element.setAttribute(key, value);  // Setzt Attribut
            }
        }
        for (let child of children) {
            if (typeof child === 'string') {
                child = document.createTextNode(child);  // Erstellt Textknoten
            }
            element.appendChild(child);  // Fügt Kind-Element hinzu
        }
        return element;
    },
    // Funktion zum Mappen von Elementen auf ein Eltern-Element
    mapping(parent, elements) {
        Object.entries(elements).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(child => parent.appendChild(dom.create(...child)));  // Fügt Kind-Elemente hinzu
            } else {
                parent.appendChild(dom.create(...value));  // Fügt Kind-Element hinzu
            }
        });
    },
    // Funktion zum Auswählen eines Elements
    $(selector, context = document) {
        return context.querySelector(selector);  // Wählt das erste Element, das dem Selektor entspricht
    },
    // Funktion zum Auswählen mehrerer Elemente
    $$(selector, context = document) {
        return Array.from(context.querySelectorAll(selector));  // Wählt alle Elemente, die dem Selektor entsprechen
    }
};
