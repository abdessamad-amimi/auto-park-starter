
export function createVoitureRow(data, getStatut) {
    const tr = document.createElement("tr");

    // Marque
    const marqueTd = document.createElement("td");
    const strongMarque = document.createElement("strong");
    strongMarque.textContent = data.marque;
    marqueTd.appendChild(strongMarque);

    // Modèle
    const modeleTd = document.createElement("td");
    modeleTd.textContent = data.modele;

    // Immatriculation
    const immatriculationTd = document.createElement("td");
    const spanImmatriculation = document.createElement("span");
    spanImmatriculation.classList.add("registration");
    spanImmatriculation.textContent = data.immatriculation;
    immatriculationTd.appendChild(spanImmatriculation);

    // Catégorie
    const categorieTd = document.createElement("td");
    categorieTd.textContent = data.categorie;

    // Prix par jour
    const prixJourTd = document.createElement("td");
    prixJourTd.classList.add("price");

    const spanPrixJour = document.createElement("span");
    spanPrixJour.textContent = " DH / jour";

    prixJourTd.append(data.prixJour, spanPrixJour);

    // Statut
    const statutTd = document.createElement("td");
    const spanStatut = document.createElement("span");
    spanStatut.classList.add("badge");
    spanStatut.classList.add(getStatut(data.statut));
    spanStatut.textContent = data.statut;
    statutTd.appendChild(spanStatut);

    // Actions
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

    divActions.append(buttonModifier, buttonSupprimer);
    actionsTd.appendChild(divActions);

    // Assemble the row
    tr.append(
        marqueTd,
        modeleTd,
        immatriculationTd,
        categorieTd,
        prixJourTd,
        statutTd,
        actionsTd
    );

    return tr;
}
