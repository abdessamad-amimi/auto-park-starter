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
            ResetForm();
            onModifier(data);
        });

        buttonSupprimer.addEventListener("click", () => {
            onSupprimer(data);
        });

        selectors.liste_voitures.appendChild(tr);
    });
}

export function Validation(letterRegex, immatriculationRegex, immatriculationExist) {
    let valid = true;
    let marque = "";
    let modele = "";
    let immatriculation = "";
    let categorie = "";
    let prix_jour = 0;
    let statut = "";

    // input marque
    if (selectors.input_marque.value.trim() == "") {
        selectors.erreur_marque.textContent = "Veuillez remplir le champs";
        valid = false;
    }
    else if (!letterRegex.test(selectors.input_marque.value)) {
        selectors.erreur_marque.textContent = "Entrez une marque valide";
        valid = false;
    }
    else {
        marque = selectors.input_marque.value;
        selectors.erreur_marque.textContent = "";
    }

    // input modele
    if (selectors.input_modele.value.trim() == "") {
        selectors.erreur_modele.textContent = "Veuillez remplir le champs";
        valid = false;
    }
    else if (!letterRegex.test(selectors.input_modele.value)) {
        selectors.erreur_modele.textContent = "Entrez un modele valid";
        valid = false;
    }
    else {
        modele = selectors.input_modele.value;
        selectors.erreur_modele.textContent = "";
    }

    //input immatriculation
    if (selectors.input_immatriculation.value == "") {
        selectors.erreur_immatriculation.textContent = "Veuillez remplir le champs";
        valid = false;
    }
    else if (!immatriculationRegex.test(selectors.input_immatriculation.value)) {
        selectors.erreur_immatriculation.textContent = "Entrez une immatriculation valid";
        valid = false;
    }
    else if (immatriculationExist(selectors.input_immatriculation.value)) {
        selectors.erreur_immatriculation.textContent = "Cette immatriculation deja existe";
        valid = false;
    }
    else {
        immatriculation = selectors.input_immatriculation.value;
        selectors.erreur_immatriculation.textContent = "";
    }

    // input categorie
    if (selectors.input_categorie.value.trim() == "") {
        selectors.erreur_categorie.textContent = "Veuillez sélectionner une categorie";
        valid = false;
    }
    else {
        categorie = selectors.input_categorie.value;
        selectors.erreur_categorie.textContent = "";
    }

    // input prix
    if (selectors.input_prix_jour.value == "") {
        selectors.erreur_prix_jour.textContent = "Veuillez remplir le champs";
        valid = false;
    }
    else if (Number(selectors.input_prix_jour.value) < 0) {
        selectors.erreur_prix_jour.textContent = "Veuillez entrer un prix valid";
        valid = false;
    }
    else {
        prix_jour = Number(selectors.input_prix_jour.value);
        selectors.erreur_prix_jour.textContent = "";
    }

    // input statut
    statut = selectors.input_statut.value;

    return {
        valid,
        marque,
        modele,
        immatriculation,
        categorie,
        prix_jour,
        statut
    };
}

export function ResetForm() {
    selectors.input_categorie.value = "";
    selectors.input_immatriculation.value = "";
    selectors.input_marque.value = "";
    selectors.input_modele.value = "";
    selectors.input_prix_jour.value = "";
    selectors.input_statut.value = "Disponible";
    selectors.erreur_categorie.hidden = true;
    selectors.erreur_immatriculation.hidden = true;
    selectors.erreur_marque.hidden = true;
    selectors.erreur_modele.hidden = true;
    selectors.erreur_prix_jour.hidden = true;
}