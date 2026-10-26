import { voituresInitiales } from "./data.js";
import { statutColor } from "./data.js";

let showedType = null;

const buttonAjouter = document.querySelector("#bouton-enregistrer");
let marque = document.querySelector("#marque");
let modele = document.querySelector("#modele");
let immatriculation = document.querySelector("#immatriculation");
let categorie = document.querySelector("#categorie");
let prix_jour = document.querySelector("#prix-jour");
let statut = document.querySelector("#statut");

const liste_voitures = document.querySelector("#liste-voitures");

function getStatut(statut){
    let className = "";
    statutColor.forEach((s) => {
        if(statut === s.nom) className = s.class;
    })
    return className;
}

function AfficherVoiture(_data){
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
        prixJourTd.append(data.prixJour , spanPrixJour);

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

AfficherVoiture(voituresInitiales);
