import { ManagerVoiture } from "../managers/VoitureManager.js";
import * as selectors from "./selectors.js";
import { createVoitureRow } from "./voitureElements.js";

const letterRegex = /^[A-Za-z]+$/;
const immatriculationRegex = /^[A-Za-z]{4}-\d{3,5}$/;

const manager = new ManagerVoiture();

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

export function CheckRemplir() {
    let valid = true
    if(selectors.input_marque.value === ""){
        selectors.erreur_marque.textContent = "Veuillez remplir le champs";
        valid = false;
    } 
    if(selectors.input_modele.value === ""){
        selectors.erreur_modele.textContent = "Veuillez remplir le champs";
        valid = false;
    } 
    if(selectors.input_categorie.value === ""){
        selectors.erreur_categorie.textContent = "Veuillez sélectionner une categorie";
        valid = false;
    } 
    if(selectors.input_immatriculation.value === ""){
        selectors.erreur_immatriculation.textContent = "Veuillez remplir le champs";
        valid = false;
    } 
    if(selectors.input_prix_jour.value === ""){
        selectors.erreur_prix_jour.textContent = "Veuillez remplir le champs";
        valid = false;
    } 

    return valid;
}



export function MarqueValidation(letterRegex) {
    let valid = true;
    let marque = "";

    // input marque
    if (selectors.input_marque.value.trim() == "") {
        selectors.erreur_marque.textContent = "Veuillez remplir le champs";
        valid = false;
    }
    else if (!letterRegex.test(selectors.input_marque.value) || selectors.input_marque.value.length < 4) {
        selectors.erreur_marque.textContent = "Entrez une marque valide";
        valid = false;
    }
    else {
        marque = selectors.input_marque.value;
        selectors.erreur_marque.textContent = "";
    }

    return { "valid": valid, "marque": marque }
}

export function ModeleValidation(letterRegex) {
    let valid = true;
    let modele = "";

    // input modele
    if (selectors.input_modele.value.trim() == "") {
        selectors.erreur_modele.textContent = "Veuillez remplir le champs";
        valid = false;
    }
    else if (!letterRegex.test(selectors.input_modele.value) || selectors.input_modele.value.length < 4) {
        selectors.erreur_modele.textContent = "Entrez un modele valid";
        valid = false;
    }
    else {
        modele = selectors.input_modele.value;
        selectors.erreur_modele.textContent = "";
    }

    return { "valid": valid, "modele": modele }
}

export function CategorieValidation() {
    let valid = true;
    let categorie = "";

    // input categorie
    if (selectors.input_categorie.value.trim() == "") {
        selectors.erreur_categorie.textContent = "Veuillez sélectionner une categorie";
        valid = false;
    }
    else {
        categorie = selectors.input_categorie.value;
        selectors.erreur_categorie.textContent = "";
    }

    return { "valid": valid, "categorie": categorie }
}

export function PrixValidation() {
    let valid = true;
    let prix_jour = 0;

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

    return { "valid": valid, "prix": prix_jour }
}

export function ImmatriculationValidation(immatriculationExist, immatriculationRegex) {
    let valid = true;
    let immatriculation = "";

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

    return { "valid": valid, "immatriculation": immatriculation }
}

export function ResetForm() {
    selectors.input_categorie.value = "";
    selectors.input_immatriculation.value = "";
    selectors.input_marque.value = "";
    selectors.input_modele.value = "";
    selectors.input_prix_jour.value = "";
    selectors.input_statut.value = "Disponible";
    selectors.erreur_categorie.textContent = "";
    selectors.erreur_immatriculation.textContent = "";
    selectors.erreur_marque.textContent = "";
    selectors.erreur_modele.textContent = "";
    selectors.erreur_prix_jour.textContent = "";
}