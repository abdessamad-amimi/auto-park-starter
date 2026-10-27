import { voituresInitiales } from "./data.js";
import { statutColor } from "./data.js";

let showedType = null;

// localStorage.setItem("data" , JSON.stringify(voituresInitiales));

let isModified = false;

let nextId = Number(localStorage.getItem("id")) || 8;

const liste_voitures = document.querySelector("#liste-voitures");

function getStatut(statut) {
    let className = "";
    statutColor.forEach((s) => {
        if (statut === s.nom) className = s.class;
    })
    return className;
}

function AfficherVoiture(_data) {
    liste_voitures.innerHTML = "";
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
        const buttonSupprimer = document.createElement("button");
        buttonSupprimer.classList = "button button-delete";
        buttonSupprimer.dataset.action = "supprimer";
        buttonSupprimer.dataset.id = data.id;
        buttonSupprimer.ariaLabel = "Supprimer la voiture";
        buttonSupprimer.textContent = "Supprimer";
        divActions.appendChild(buttonModifier);
        divActions.appendChild(buttonSupprimer);
        actionsTd.appendChild(divActions);

        tr.append(marqueTd, modeleTd, immatriculationTd, categorieTd, prixJourTd, statutTd, actionsTd);

        liste_voitures.appendChild(tr);
    })
}

AfficherVoiture(JSON.parse(localStorage.getItem("data")));

const buttonAjouter = document.querySelector("#bouton-enregistrer");
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

const letterRegex = /^[A-Za-z0-9]+$/;
const immatriculationRegex = /^[A-Za-z]{4}-\d{3,5}$/

function immatriculationExist(_input) {
    let exist = false;
    JSON.parse(localStorage.getItem("data")).forEach((voiture) => {
        if (voiture.immatriculation.toLowerCase() === _input.toLowerCase()) exist = true;
    });
    return exist;
}

function AjouterVoiture() {
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
        const objet = {
            "id": nextId,
            "marque": marque,
            "modele": modele,
            "immatriculation": immatriculation,
            "categorie": categorie,
            "prixJour": prix_jour,
            "statut": statut
        }

        input_categorie.value = "";
        input_immatriculation.value = "";
        input_marque.value = "";
        input_modele.value = "";
        input_prix_jour.value = "";
        input_statut.value = "Disponible"


        let dataVoiture = JSON.parse(localStorage.getItem("data"));
        dataVoiture.push(objet);
        localStorage.setItem("data" , JSON.stringify(dataVoiture));

        nextId ++;
        localStorage.setItem("id" , nextId);
        AfficherVoiture(dataVoiture);
    }

}

buttonAjouter.addEventListener("click", (e) => {
    e.preventDefault();
    if(!isModified) AjouterVoiture();
    else{
        isModified = false;
    }
})

const button_delete = document.querySelector(".button-delete");

button_delete.addEventListener("click" => (e) => {
    e.preventDefault();
})