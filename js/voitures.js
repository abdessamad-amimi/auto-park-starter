import { voituresInitiales } from "./data.js";
import { statutColor } from "./data.js";
import { ManagerVoiture } from "./managers/VoitureManager.js";
import { Voiture } from "./models/Voiture.js"
import * as selectors from "./view/selectors.js";
// import { createVoitureRow } from "./view/voitureElements.js";
import { AfficherVoitures, MarqueValidation, ModeleValidation, CategorieValidation, PrixValidation, ImmatriculationValidation, ResetForm, CheckRemplir } from "./view/ui.js";

let idModified = null;
let idSupprimer = null;

console.table(voituresInitiales);
console.error("ici");



if (!JSON.parse(localStorage.getItem("data"))) {
    localStorage.setItem("data", JSON.stringify(voituresInitiales));
}

let manager = new ManagerVoiture();

let showedType = JSON.parse(localStorage.getItem("data"));

let isModified = false;

let objetVoiture = null;

let nextId = Number(localStorage.getItem("id")) || 7;

function getStatut(statut) {
    let className = "";
    statutColor.forEach((s) => {
        if (statut === s.nom) className = s.class;
    })
    return className;
}



function RemplirFormulaire(data) {
    selectors.buttonAjouter.textContent = "Modifier la voiture";

    selectors.input_categorie.value = data.categorie;
    selectors.input_immatriculation.value = data.immatriculation;
    selectors.input_marque.value = data.marque;
    selectors.input_modele.value = data.modele;
    selectors.input_prix_jour.value = data.prixJour;
    selectors.input_statut.value = data.statut;

    isModified = true;
    idModified = data.id;
    objetVoiture = data;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    selectors.button_annuler.removeAttribute("hidden");
}

function ConfirmerSuppression(data) {
    idSupprimer = data.id;
    SupprimerVoiture();
}

function AfficherVoiture(_data) {
    AfficherVoitures(_data, getStatut, RemplirFormulaire, ConfirmerSuppression)
}

AfficherVoiture(manager.AfficherVoiture());

const letterRegex = /^[A-Za-z]+$/;
const immatriculationRegex = /^[A-Za-z]{4}-\d{3,5}$/;

function immatriculationExist(_input) {
    let exist = false;

    manager.voitures.forEach((voiture) => {
        if (voiture.immatriculation.toLowerCase() === _input.toLowerCase() && voiture.id !== idModified) {
            exist = true;
        }
    });
    return exist;
}

let valid = true;
let marque = "";
let modele = "";
let immatriculation = "";
let categorie = "";
let prix_jour = 0;
let statut = "";

function CheckValidity() {
    selectors.input_marque.addEventListener("input", () => {
        const result = MarqueValidation(letterRegex);
        valid = result.valid;
        marque = result.marque;
    });

    selectors.input_modele.addEventListener("input", () => {
        const result = ModeleValidation(letterRegex);
        valid = result.valid;
        modele = result.modele;
    });

    selectors.input_immatriculation.addEventListener("input", () => {
        const result = ImmatriculationValidation(immatriculationExist, immatriculationRegex)
        valid = result.valid;
        immatriculation = result.immatriculation;
    });

    selectors.input_categorie.addEventListener("change", () => {
        const result = CategorieValidation();
        valid = result.valid;
        categorie = result.categorie;
    });

    selectors.input_prix_jour.addEventListener("input", () => {
        const result = PrixValidation();
        valid = result.valid;
        prix_jour = result.prix;
    });
}
CheckValidity();

function AjouterVoiture(ElementModified) {
    // valid = CheckRemplir();
    // console.log(valid);
    // debugger; 
    
    valid = MarqueValidation().valid;
    valid = ModeleValidation().valid;
    valid = ImmatriculationValidation().valid;
    valid = CategorieValidation().valid;
    valid = PrixValidation().valid;

    statut = selectors.input_statut.value;
    nextId = Number(localStorage.getItem("id")) || 8;

    CheckValidity();

    if (valid) {
        if (!isModified) {
            const objet = {
                "id": nextId,
                "marque": marque,
                "modele": modele,
                "immatriculation": immatriculation,
                "categorie": categorie,
                "prixJour": prix_jour,
                "statut": statut
            }

            manager.AjouterVoiture(objet);

            ResetForm();

            nextId++;
            localStorage.setItem("id", nextId);

        }
        else {
            const objet = {
                "id": ElementModified.id,
                "marque": selectors.input_marque.value,
                "modele": selectors.input_modele.value,
                "immatriculation": selectors.input_immatriculation.value,
                "categorie": selectors.input_categorie.value,
                "prixJour": selectors.input_prix_jour.value,
                "statut": statut
            }

            manager.ModifierVoiture(idModified, objet);

            selectors.buttonAjouter.textContent = "Ajouter la voiture";
            selectors.button_annuler.hidden = true;
            ResetForm();
            isModified = false;
            idModified = null;
            objetVoiture = null;
        }
        AfficherVoiture(manager.AfficherVoiture());
    }
}

selectors.buttonAjouter.addEventListener("click", (e) => {
    e.preventDefault();
    AjouterVoiture(objetVoiture);
})

selectors.button_annuler.addEventListener("click", () => {
    selectors.buttonAjouter.textContent = "Ajouter la voiture";
    selectors.button_annuler.hidden = true;
    isModified = false;
    idModified = null;
    objetVoiture = null;
    ResetForm();
})

function SupprimerVoiture() {
    if (idModified === idSupprimer) {
        alert("Impossible de supprimer cette voiture pendant sa modification.");
        return;
    }
    if (confirm("Confirmer de supprimer: ")) {
        manager.SupprimerVoiture(idSupprimer);
        selectors.recherche_input.value = "";
        selectors.filtre_statut.value = "";
        selectors.filtre_categorie.value = "";
        selectors.trie_prix.value = "";
        AfficherVoiture(manager.AfficherVoiture());
    }
}

function CallFunctions() {
    let filtred_data = manager.RechercherVoiture(manager.AfficherVoiture(), selectors.recherche_input.value);
    filtred_data = manager.FilterStatut(filtred_data, selectors.filtre_statut.value);
    filtred_data = manager.FilterCategorie(filtred_data, selectors.filtre_categorie.value);
    filtred_data = manager.TrieArray(filtred_data, selectors.trie_prix.value);
    AfficherVoiture(filtred_data);
}

selectors.recherche_input.addEventListener("input", () => {
    CallFunctions();
})

selectors.filtre_statut.addEventListener("change", () => {
    CallFunctions();
})

selectors.filtre_categorie.addEventListener("change", () => {
    CallFunctions();
})

selectors.trie_prix.addEventListener("change", () => {
    CallFunctions();
})

selectors.reinitialiser_filtres.addEventListener("click", () => {
    let fullData = JSON.parse(localStorage.getItem("data"));
    selectors.recherche_input.value = "";
    selectors.filtre_statut.value = "";
    selectors.filtre_categorie.value = "";
    selectors.trie_prix.value = "";
    AfficherVoiture(fullData);
})