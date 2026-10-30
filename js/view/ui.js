import * as selectors from "./selectors.js";
import { createVoitureRow } from "./voitureElements.js";

export function AfficherVoitures(_data, getStatut, onModifier, onSupprimer) {
    selectors.liste_voitures.innerHTML = "";
    selectors.etat_vide.hidden = true;

    if (_data.length === 0) {
        selectors.etat_vide.hidden = false;
        return;
    }

    _data.forEach((data) => {
        const tr = createVoitureRow(data, getStatut);

        const buttonModifier = tr.querySelector('[data-action="modifier"]');
        const buttonSupprimer = tr.querySelector('[data-action="supprimer"]');

        buttonModifier.addEventListener("click", () => {
            onModifier(data);
        });

        buttonSupprimer.addEventListener("click", () => {
            onSupprimer(data);
        });

        selectors.liste_voitures.appendChild(tr);
    });
}