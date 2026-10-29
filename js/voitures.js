import { voituresInitiales } from "./data.js";
import { statutColor } from "./data.js";
import { ManagerVoiture } from "./managers/VoitureManager.js";
import { Voiture } from "./models/Voiture.js"
let manager = new ManagerVoiture();
console.log(manager.voitures[0] instanceof Voiture);

let idModified = null;
let idSupprimer = null;


if (!JSON.parse(localStorage.getItem("data"))) {
    localStorage.setItem("data", JSON.stringify(voituresInitiales));
}
let showedType = JSON.parse(localStorage.getItem("data"));

let isModified = false;

let objetVoiture = null;

let nextId = Number(localStorage.getItem("id")) || 8;

const liste_voitures = document.querySelector("#liste-voitures");

function getStatut(statut) {
    let className = "";
    statutColor.forEach((s) => {
        if (statut === s.nom) className = s.class;
    })
    return className;
}

function ResetForm() {
    input_categorie.value = "";
    input_immatriculation.value = "";
    input_marque.value = "";
    input_modele.value = "";
    input_prix_jour.value = "";
    input_statut.value = "Disponible"
}

const etat_vide = document.querySelector("#etat-vide");


function AfficherVoiture(_data) {
    liste_voitures.innerHTML = "";
    etat_vide.hidden = true;
    if (_data.length === 0) {
        etat_vide.hidden = false;
        return;
    }
    _data.forEach((data) => {
        const tr = document.createElement("tr");

        const marqueTd = document.createElement("td");
        const strongMarque = document.createElement("strong");
        strongMarque.textContent = data.marque;
        marqueTd.appendChild(strongMarque);

        const modeleTd = document.createElement("td");
        modeleTd.textContent = data.modele;

        const immatriculationTd = document.createElement("td");
        const spanImmatriculation = document.createElement("span");
        spanImmatriculation.classList.add("registration");
        spanImmatriculation.textContent = data.immatriculation;
        immatriculationTd.appendChild(spanImmatriculation);

        const categorieTd = document.createElement("td");
        categorieTd.textContent = data.categorie;

        const prixJourTd = document.createElement("td");
        prixJourTd.classList.add("price");
        const spanPrixJour = document.createElement("span");
        spanPrixJour.textContent = " DH / jour";
        prixJourTd.append(data.prixJour, spanPrixJour);

        const statutTd = document.createElement("td");
        const spanStatut = document.createElement("span");
        spanStatut.classList.add("badge");
        spanStatut.classList.add(getStatut(data.statut));
        spanStatut.textContent = data.statut;
        statutTd.appendChild(spanStatut);

        const actionsTd = document.createElement("td");
        const divActions = document.createElement("div");
        divActions.classList.add("row-actions");
        const buttonModifier = document.createElement("button");
        buttonModifier.classList = "button button-edit";
        buttonModifier.dataset.action = "modifier";
        buttonModifier.dataset.id = data.id;
        buttonModifier.ariaLabel = "Modifier la voiture";
        buttonModifier.textContent = "Modifier";
        buttonModifier.addEventListener("click", (e) => {
            e.preventDefault();
            buttonAjouter.textContent = "Modifier la voiture";
            input_categorie.value = data.categorie;
            input_immatriculation.value = data.immatriculation;
            input_marque.value = data.marque;
            input_modele.value = data.modele;
            input_prix_jour.value = data.prixJour;
            input_statut.value = data.statut
            isModified = true;
            idModified = data.id;
            objetVoiture = data;
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            button_annuler.removeAttribute("hidden");
        })

        const buttonSupprimer = document.createElement("button");
        buttonSupprimer.classList = "button button-delete";
        buttonSupprimer.dataset.action = "supprimer";
        buttonSupprimer.dataset.id = data.id;
        buttonSupprimer.ariaLabel = "Supprimer la voiture";
        buttonSupprimer.textContent = "Supprimer";
        divActions.appendChild(buttonModifier);
        divActions.appendChild(buttonSupprimer);
        actionsTd.appendChild(divActions);
        buttonSupprimer.addEventListener("click", (e) => {
            e.preventDefault();
            idSupprimer = data.id;
            SupprimerVoiture();
        })

        tr.append(marqueTd, modeleTd, immatriculationTd, categorieTd, prixJourTd, statutTd, actionsTd);

        liste_voitures.appendChild(tr);
    })
}

AfficherVoiture(manager.AfficherVoiture());

const buttonAjouter = document.querySelector("#bouton-enregistrer");
const button_annuler = document.querySelector("#annuler-modification");
let input_marque = document.querySelector("#marque");
let input_modele = document.querySelector("#modele");
let input_immatriculation = document.querySelector("#immatriculation");
let input_categorie = document.querySelector("#categorie");
let input_prix_jour = document.querySelector("#prix-jour");
let input_statut = document.querySelector("#statut");

let erreur_marque = document.querySelector("#erreur-marque");
let erreur_modele = document.querySelector("#erreur-modele");
let erreur_immatriculation = document.querySelector("#erreur-immatriculation");
let erreur_categorie = document.querySelector("#erreur-categorie");
let erreur_prix_jour = document.querySelector("#erreur-prix-jour");
// let erreur_statut = document.querySelector("#erreur-statut");

const letterRegex = /^[A-Za-z]+$/;
const immatriculationRegex = /^[A-Za-z]{4}-\d{3,5}$/

function immatriculationExist(_input) {
    let exist = false;

    JSON.parse(localStorage.getItem("data")).forEach((voiture) => {
        if (voiture.immatriculation.toLowerCase() === _input.toLowerCase() && voiture.id !== idModified) {
            exist = true;
        }
    });

    return exist;
}

function AjouterVoiture(ElementModified) {
    let valid = true;
    let marque = "";
    let modele = "";
    let immatriculation = "";
    let categorie = "";
    let prix_jour = 0;
    let statut = "";

    // input marque
    if (input_marque.value.trim() == "") {
        erreur_marque.textContent = "Veuillez remplir le champs";
        valid = false;
    }
    else if (!letterRegex.test(input_marque.value)) {
        erreur_marque.textContent = "Entrez une marque valide";
        valid = false;
    }
    else {
        marque = input_marque.value;
        erreur_marque.textContent = "";
    }

    // input modele
    if (input_modele.value.trim() == "") {
        erreur_modele.textContent = "Veuillez remplir le champs";
        valid = false;
    }
    else if (!letterRegex.test(input_modele.value)) {
        erreur_modele.textContent = "Entrez un modele valid";
        valid = false;
    }
    else {
        modele = input_modele.value;
        erreur_modele.textContent = "";
    }

    //input immatriculation
    if (input_immatriculation.value == "") {
        erreur_immatriculation.textContent = "Veuillez remplir le champs";
        valid = false;
    }
    else if (!immatriculationRegex.test(input_immatriculation.value)) {
        erreur_immatriculation.textContent = "Entrez une immatriculation valid";
        valid = false;
    }
    else if (immatriculationExist(input_immatriculation.value)) {
        erreur_immatriculation.textContent = "Cette immatriculation deja existe";
        valid = false;
    }
    else {
        immatriculation = input_immatriculation.value;
        erreur_immatriculation.textContent = "";
    }

    // input categorie
    if (input_categorie.value.trim() == "") {
        erreur_categorie.textContent = "Veuillez sélectionner une categorie";
        valid = false;
    }
    else {
        categorie = input_categorie.value;
        erreur_categorie.textContent = "";
    }

    // input prix
    if (input_prix_jour.value == "") {
        erreur_prix_jour.textContent = "Veuillez remplir le champs";
        valid = false;
    }
    else if (Number(input_prix_jour.value) < 0) {
        erreur_prix_jour.textContent = "Veuillez entrer un prix valid";
        valid = false;
    }
    else {
        prix_jour = Number(input_prix_jour.value);
        erreur_prix_jour.textContent = "";
    }

    // input statut
    statut = input_statut.value;
    nextId = Number(localStorage.getItem("id")) || 8;
    // if valid
    if (valid) {

        // let dataVoiture = JSON.parse(localStorage.getItem("data"));
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

            nextId++;
            localStorage.setItem("id", nextId);
            input_categorie.value = "";
            input_immatriculation.value = "";
            input_marque.value = "";
            input_modele.value = "";
            input_prix_jour.value = "";
            input_statut.value = "Disponible"
        }
        else {
            const objet = {
                "id": ElementModified.id,
                "marque": marque,
                "modele": modele,
                "immatriculation": immatriculation,
                "categorie": categorie,
                "prixJour": prix_jour,
                "statut": statut
            }

            // let index = dataVoiture.findIndex((voiture) => voiture.id === idModified);
            // dataVoiture[index] = objet;

            // localStorage.setItem("data", JSON.stringify(dataVoiture));

            manager.ModifierVoiture(idModified, objet);

            buttonAjouter.textContent = "Ajouter la voiture";
            button_annuler.hidden = true;
            ResetForm();
            isModified = false;
        }
        AfficherVoiture(manager.AfficherVoiture());
    }
}

buttonAjouter.addEventListener("click", (e) => {
    e.preventDefault();
    if (!isModified) AjouterVoiture();
    else {
        AjouterVoiture(objetVoiture);
    }
})

button_annuler.addEventListener("click", () => {
    buttonAjouter.textContent = "Ajouter la voiture";
    button_annuler.hidden = true;
    ResetForm();
})

function SupprimerVoiture() {
    if (idModified === idSupprimer) {
        alert("Impossible de supprimer cette voiture pendant sa modification.");
        return;
    }
    if (confirm("Confirmer de supprimer: ")) {
        manager.SupprimerVoiture(idSupprimer);
        recherche_input.value = "";
        filtre_statut.value = "";
        filtre_categorie.value = "";
        trie_prix.value = "";
        AfficherVoiture(manager.AfficherVoiture());
    }
}

const recherche_input = document.querySelector("#recherche");
const filtre_statut = document.querySelector("#filtre-statut");
const filtre_categorie = document.querySelector("#filtre-categorie");
const trie_prix = document.querySelector("#tri-prix");
const reinitialiser_filtres = document.querySelector("#reinitialiser-filtres");


function CallFunctions() {
    let filtred_data = manager.RechercherVoiture(manager.AfficherVoiture(), recherche_input.value);
    filtred_data = manager.FilterStatut(filtred_data, filtre_statut.value);
    filtred_data = manager.FilterCategorie(filtred_data, filtre_categorie.value);
    filtred_data = manager.TrieArray(filtred_data, trie_prix.value);
    AfficherVoiture(filtred_data);
}

recherche_input.addEventListener("input", () => {
    CallFunctions();
})

filtre_statut.addEventListener("change", () => {
    CallFunctions();
})

filtre_categorie.addEventListener("change", () => {
    CallFunctions();
})

trie_prix.addEventListener("change", () => {
    CallFunctions();
})

reinitialiser_filtres.addEventListener("click", () => {
    let fullData = JSON.parse(localStorage.getItem("data"));
    recherche_input.value = "";
    filtre_statut.value = "";
    filtre_categorie.value = "";
    trie_prix.value = "";
    AfficherVoiture(fullData);
})