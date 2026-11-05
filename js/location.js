import { ManagerVoiture } from "./managers/VoitureManager.js";
import { Voiture } from "./models/Voiture.js";

const selectedConfig = {
    etape: 1,
    voitureId: null,
    dateDebut: "",
    dateFin: "",
    modeRecuperation: "",

    recuperation: {
        // Mode agence uniquement.
        heureRecuperation: "",

        // Mode aeroport uniquement.
        aeroport: "",
        numeroVol: "",
        heureArrivee: "",

        // Mode adresse uniquement.
        ville: "",
        adresse: "",
        heureLivraison: "",
    },

    options: {
        siegeBebe: false,
        conducteurSupplementaire: false,
    },
};

console.log(selectedConfig)


let precedent = false;

const sectionPayement = document.querySelector(".payement");

const vehiculeSection = document.querySelector(".vehicule");
const recuperationSection = document.querySelector(".recuperation");
const optionSection = document.querySelector(".options")

const suivant = document.querySelectorAll(".suivant");
const recommencer = document.querySelectorAll(".recommencer");

const adresse = document.querySelector(".adresse");
const aeroport = document.querySelector(".aeroport");
const agence = document.querySelector(".agence");

const infoRecuperation = document.querySelector(".infoRecuperation");

const pages = document.querySelectorAll(".page");
const nbr = document.querySelectorAll(".nbr");

function VehiculeValid() {
    let valid = true;
    let oneChecked = false;
    document.querySelectorAll(".car").forEach((article) => {
        if (article.classList.contains("selectionned")) {
            oneChecked = true;
        }
    })
    if (!oneChecked) {
        valid = false;
        alert("Veuillez selectionner une voiture !");
        console.log("erreur");

    }

    else if (dateDebut.value === "" || dateFin.value === "") {
        alert("Veuillez saisir des dates !");
        valid = false;
    }

    return valid;
}

function RecuperationValid() {
    let valid = true;
    if (agence.querySelector("input").checked === true) {
        if (selectedConfig.recuperation.heureRecuperation === "") valid = false;
    }

    if (aeroport.querySelector("input").checked === true) {
        if (
            selectedConfig.recuperation.aeroport === "" ||
            selectedConfig.recuperation.numeroVol === "" ||
            selectedConfig.recuperation.heureArrivee === ""
        ) valid = false
    }

    if (adresse.querySelector("input").checked === true) {
        if (selectedConfig.recuperation.ville === "" ||
            selectedConfig.recuperation.adresse === "" ||
            selectedConfig.recuperation.heureLivraison === ""
        ) valid = false;
    }

    return valid;
}

function VehiculeSection() {
    vehiculeSection.hidden = false;
    recuperationSection.hidden = true;
    selectedConfig.etape = 1;
    selectedConfig.modeRecuperation = "";
    precedent = false;
}

function RecuperationSection() {
    if (VehiculeValid()) {
        vehiculeSection.hidden = true;
        recuperationSection.hidden = false;
        optionSection.hidden = true;
        pages.forEach(p => p.classList.remove("current"));
        pages[0].classList.add("current");
        let i = 1;
        nbr.forEach(n => {
            n.textContent = i;
            i++;
        })
        nbr[0].textContent = "✔";
        pages[1].classList.add("current");
        selectedConfig.etape = 2;
        ModeRecuperation();
        precedent = true;
        recommencer[1].textContent = "Précédent";
        precedent = true;
        selectedConfig.modeRecuperation = "agence";
    }
}

function OptionSection() {
    if (RecuperationValid()) {
        vehiculeSection.hidden = true;
        recuperationSection.hidden = true;
        optionSection.hidden = false;
        selectedConfig.etape = 3;
        pages[2].classList.add("current");
        nbr[1].textContent = "✔";
        recommencer[2].textContent = "Précédent";
        precedent = true;
    }
    else {
        alert("Veuillez remplir tous les champs")
    }
}

suivant.forEach(btn => {
    btn.addEventListener("click", () => {
        if (selectedConfig.etape === 1) {
            RecuperationSection();
        }

        else if (selectedConfig.etape === 2) {
            OptionSection();
        }
    })
})

function Recommencer() {
    window.location.reload();
}

recommencer.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (precedent) {
            if (selectedConfig.etape === 2) {
                VehiculeSection();
            }
            else if (selectedConfig.etape === 3) {
                RecuperationSection();
            }
        }

        else {
            VehiculeSection();
            Recommencer();
        }
    })
})

function CreateAgence() {
    const titreInfo = create("h3");
    titreInfo.textContent = "Information de récupération";

    const heure = create("div", "heure");

    const heureLabel = create("label");
    heureLabel.textContent = "Heure de récupération *";

    const heureRecuperation = create("input", "heureRecuperation");
    heureRecuperation.type = "time";
    heureRecuperation.addEventListener("input", () => {
        selectedConfig.recuperation.heureRecuperation = heureRecuperation.value
        ChargerPayement(selectedConfig);
    })

    heure.append(heureLabel, heureRecuperation);

    const infoSupplement = create("p");
    infoSupplement.textContent = "Le supplément de récupération est ajouté une seule fois au total.";

    infoRecuperation.append(titreInfo, heure, infoSupplement);
}

function CreateAeroport() {
    const titreInfo = create("h3");
    titreInfo.textContent = "Information de récupération";

    const aero = create("div", "aero");

    const aeroLabel = create("label");
    aeroLabel.textContent = "Aéroport *";
    aeroLabel.htmlFor = "aeroport";

    const aeroInput = create("input");
    aeroInput.type = "text";
    aeroInput.id = "aeroport";
    aeroInput.placeholder = "Casablanca — Mohammed V";
    aeroInput.addEventListener("input", () => {
        selectedConfig.recuperation.aeroport = aeroInput.value
        ChargerPayement(selectedConfig);
    })

    aero.append(aeroLabel, aeroInput);

    const infoVol = create("div", "infoVol");
    infoVol.style.display = "flex";
    infoVol.style.justifyContent = "space-between";

    const nVol = create("div", "nVol");
    nVol.style.width = "40%";

    const nVolLabel = create("label");
    nVolLabel.textContent = "Numéro du vol";
    nVolLabel.htmlFor = "Nvol";

    const nVolInput = create("input");
    nVolInput.type = "text";
    nVolInput.id = "Nvol";
    nVolInput.placeholder = "AT 205";
    nVolInput.addEventListener("input", () => {
        selectedConfig.recuperation.numeroVol = nVolInput.value
        ChargerPayement(selectedConfig);
    })

    nVol.append(nVolLabel, nVolInput);

    const hVol = create("div", "hVol");
    hVol.style.width = "40%";

    const hVolLabel = create("label");
    hVolLabel.textContent = "Heure d'arrivée";
    hVolLabel.htmlFor = "Hvol";

    const hVolInput = create("input");
    hVolInput.type = "time";
    hVolInput.id = "Hvol";
    hVolInput.addEventListener("input", () => {
        selectedConfig.recuperation.heureArrivee = hVolInput.input
        ChargerPayement(selectedConfig);
    })

    hVol.append(hVolLabel, hVolInput);

    infoVol.append(nVol, hVol);

    const infoSupplement = create("p");
    infoSupplement.textContent =
        "Le supplément de récupération est ajouté une seule fois au total.";

    infoRecuperation.append(titreInfo, aero, infoVol, infoSupplement);
}

function CreateAdresse() {
    const titreInfo = create("h3");
    titreInfo.textContent = "Information de récupération";

    const ville = create("div", "ville");

    const villeLabel = create("label");
    villeLabel.textContent = "Ville *";
    villeLabel.htmlFor = "villeName";

    const villeInput = create("input");
    villeInput.type = "text";
    villeInput.id = "villeName";
    villeInput.placeholder = "Casablanca";
    villeInput.addEventListener("input", () => {
        selectedConfig.recuperation.ville = villeInput.value
        ChargerPayement(selectedConfig);
    })

    ville.append(villeLabel, villeInput);

    const adresse = create("div", "adresse");

    const adresseLabel = create("label");
    adresseLabel.textContent = "Adresse Complete";
    adresseLabel.htmlFor = "fullAdresse";

    const adresseInput = create("input");
    adresseInput.type = "text";
    adresseInput.id = "fullAdresse";
    adresseInput.placeholder = "24, boulevard Zerktouni";
    adresseInput.addEventListener("input", () => {
        selectedConfig.recuperation.adresse = adresseInput.value
        ChargerPayement(selectedConfig);
    })

    adresse.append(adresseLabel, adresseInput);

    const heure = create("div", "heure");

    const heureLabel = create("label");
    heureLabel.textContent = "Heure de livraison";
    heureLabel.htmlFor = "heureLivraison";

    const heureInput = create("input");
    heureInput.type = "time";
    heureInput.id = "heureLivraison";
    heureInput.addEventListener("input", () => {
        selectedConfig.recuperation.heureLivraison = heureInput.value;
        ChargerPayement(selectedConfig);
    })

    heure.append(heureLabel, heureInput);

    const infoSupplement = create("p");
    infoSupplement.textContent =
        "Le supplément de récupération est ajouté une seule fois au total.";

    infoRecuperation.append(titreInfo, ville, adresse, heure, infoSupplement);
}

function ModeRecuperation() {
    infoRecuperation.replaceChildren();

    if (selectedConfig.etape === 2) {
        if (agence.querySelector("input").checked === true) {
            CreateAgence();
            selectedConfig.modeRecuperation = "agence";
            ChargerPayement(selectedConfig);
            return;
        }

        if (aeroport.querySelector("input").checked === true) {
            CreateAeroport();
            selectedConfig.modeRecuperation = "aeroport";
            ChargerPayement(selectedConfig);
            return;
        }

        if (adresse.querySelector("input").checked === true) {
            CreateAdresse();
            selectedConfig.modeRecuperation = "adresse";
            ChargerPayement(selectedConfig);
        }
    }
}

ModeRecuperation();

const manager = new ManagerVoiture();
const list = document.querySelector(".tikets");

console.log(manager.voitures);

const checkboxs = document.getElementsByName("voiture");

const dateDebut = document.querySelector(".date-debut");
const dateFin = document.querySelector(".date-fin");

dateFin.addEventListener("input", () => {
    if (dateDebut.value === "") {
        alert("Sasir la date de debut");
        dateFin.value = "";
    }
    else if (CalculerJours(dateDebut.value, dateFin.value) < 0) {
        alert("La date de début doit etre avant la date de fin");
        dateDebut.value = "";
        dateFin.value = "";
    }
    else {
        selectedConfig.dateDebut = dateDebut.value;
        selectedConfig.dateFin = dateFin.value;
        ChargerPayement(selectedConfig)
    }
})


let voitureSelectionne = null;
let nJour = null;
let prixRecuperation = 0;
let options = null;
let recuperation = null;

function Afficher() {
    list.replaceChildren();
    manager.AfficherVoiture().forEach(voiture => {
        const article = document.createElement("article");
        article.classList.add("car");

        const span1 = document.createElement("span");
        span1.classList.add("first");
        const p = document.createElement("p");
        p.textContent = voiture.categorie;
        const input = document.createElement("input");
        input.setAttribute("type", "radio");
        input.setAttribute("name", "voiture");
        const span2 = document.createElement("span");
        span2.textContent = voiture.marque;
        const span3 = document.createElement("span");
        span3.textContent = voiture.statut;
        const span4 = document.createElement("span");
        span4.textContent = `${voiture.prixJour} MAD / jour`

        span1.append(p, input);
        article.append(span1, span2, span3, span4);

        article.addEventListener("click", () => {
            document.querySelectorAll(".car").forEach((a) => a.classList.remove("selectionned"));
            article.classList.add("selectionned");
            input.checked = true;

            selectedConfig.voitureId = voiture.id;
            ChargerPayement(selectedConfig);

        })

        list.append(article);
    });
}

Afficher();

function CalculerJours(debut, fin) {
    let start = new Date(debut);
    let end = new Date(fin);
    let timeDifference = end - start;
    let daysDifference = timeDifference / (1000 * 3600 * 24);
    return daysDifference + 1;
}

function create(tag, className) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    return element;
}

`<h3>VOTRE LOCATION</h3>
            <h2>Dacia Sandero</h2>
            <p>Citadine · 250 MAD / jour</p>
            <hr>
            <p class="date">
                10 → 12 novembre 2026
            </p>
            <div class="recu">
                <p><label class="nJour" for="">3 jours · dates incluses</label><span></span></p>
                <p><label class="nCar" for="">Véhicule · 3 × 250 MAD</label><span class="prixCar">750 MAD</span></p>
                <p><label class="options" for="">Siège bébé · 3 × 30 MAD</label><span class="prixOptions">90 MAD</span></p>
                <p><label class="recuperation" for="">Récupération</label><span prixRecu>Gratuit</span></p>
            </div>
            <hr>
            <p class="mt"><label class="total" for="">Total estimé</label> <span class="prixTotal">990 MAD</span></p>
            <p>Frais de récupération facturés une seule fois.</p>
            <button>Une demande, sans paiement en ligne.</button>`

function ChargerPayement(selectedConfig) {
    sectionPayement.replaceChildren();
    let voiture = null;
    let nJour = null;
    let total = null;
    if (selectedConfig.voitureId !== null) {
        voiture = manager.voitures.find((v) => v.id === selectedConfig.voitureId);
    }

    const titre = create("h3");
    titre.textContent = "VOTRE LOCATION";
    const nomVoiture = create("h2");
    const infoVoiture = create("p");
    if (voiture !== null) {
        nomVoiture.textContent = `${voiture.marque} ${voiture.modele}`;
        infoVoiture.textContent = `${voiture.categorie} · ${voiture.prixJour} MAD / Jour`;
    }

    const hr1 = create("hr");

    const date = create("p", "date");
    if (selectedConfig.dateDebut !== "" && selectedConfig.dateFin !== "") {
        date.textContent = `${selectedConfig.dateDebut} → ${selectedConfig.dateFin}`
        nJour = CalculerJours(selectedConfig.dateDebut, selectedConfig.dateFin);
    }

    const recu = create("div", "recu");

    const pJour = create("p");
    const nJourLabel = create("label", "nJour");
    const nJourSpan = create("span");
    if (nJour !== null) {
        nJourLabel.textContent = `${nJour} jours · dates incluses`;
    }
    pJour.append(nJourLabel, nJourSpan);

    const pCar = create("p");
    const nCarLabel = create("label", "nCar");
    const prixCar = create("span", "prixCar");
    if (voiture !== null && nJour !== null) {
        nCarLabel.textContent = `Véhicule · ${nJour} × ${voiture.prixJour} MAD`;
        prixCar.textContent = `${nJour * voiture.prixJour} MAD`
        total = nJour * voiture.prixJour;
    }
    pCar.append(nCarLabel, prixCar);

    const pOptions = create("p");
    pOptions.hidden = true;
    const options1Label = create("label", "options");
    const prixOptions1 = create("span", "prixOptions");

    const options2Label = create("label", "options");
    const prixOptions2 = create("span", "prixOptions");

    pOptions.append(options1Label, prixOptions1, options2Label, prixOptions2);

    if(selectedConfig.options.siegeBebe === true){
        options1Label.textContent = `Siège`
    }

    const pRecup = create("p");
    const recuperationLabel = create("label");

    const prixRecu = create("span", "prixRecu");
    if (selectedConfig.modeRecuperation === "") {
        recuperationLabel.textContent = "";
        prixRecu.textContent = "";
    }
    else if (selectedConfig.modeRecuperation === "agence") {
        recuperationLabel.textContent = "Récupération";
        prixRecu.textContent = "Gratuit";
    }
    else if (selectedConfig.modeRecuperation === "aeroport") {
        recuperationLabel.textContent = "Récupération";
        prixRecu.textContent = "150 MAD";
        total += 150;
    }
    else if (selectedConfig.modeRecuperation === "adresse") {
        recuperationLabel.textContent = "Récupération";
        prixRecu.textContent = "100 MAD";
        total += 100;
    }
    pRecup.append(recuperationLabel, prixRecu);

    recu.append(pJour, pCar, pOptions, pRecup);

    const hr2 = create("hr");

    const pTotal = create("p", "mt");
    const totalLabel = create("label", "total");
    const prixTotal = create("span", "prixTotal");
    pTotal.append(totalLabel, prixTotal);
    if (total !== null) {
        totalLabel.textContent = "Total estimé";
        prixTotal.textContent = `${total} MAD`
    }

    const fraisInfo = create("p");
    fraisInfo.textContent = "Frais de récupération facturés une seule fois."
    const bouton = create("button");
    bouton.textContent = "Une demande, sans paiement en ligne.";

    sectionPayement.append(
        titre,
        nomVoiture,
        infoVoiture,
        hr1,
        date,
        recu,
        hr2,
        pTotal,
        fraisInfo,
        bouton
    );
}

ChargerPayement(selectedConfig)


const recupereation = document.getElementsByName("recupereation");

const article = document.querySelectorAll(".mode");

article.forEach((a) => {
    a.addEventListener("click", () => {
        document.querySelectorAll(".mode").forEach((mode) => mode.classList.remove("selectionned"));
        a.classList.add("selectionned");
        const input = a.querySelector("input");

        input.checked = true;
        ModeRecuperation();
    })
})


const siege = document.querySelector(".siege");
const conducteur = document.querySelector(".conducteur");

siege.addEventListener("click" , () => {
    if (siege.classList.contains("optionSelectionned")) siege.classList.remove("optionSelectionned")
    else siege.classList.add("optionSelectionned")
    if(siege.querySelector("input").checked === true){
        siege.querySelector("input").checked = false ;
        selectedConfig.options.siegeBebe = false;
    }
    else{
        siege.querySelector("input").checked = true ;
        selectedConfig.options.siegeBebe = true;
    }
    ChargerPayement();
})

conducteur.addEventListener("click" , () => {
    if (conducteur.classList.contains("optionSelectionned")) conducteur.classList.remove("optionSelectionned")
    else conducteur.classList.add("optionSelectionned")
    if(conducteur.querySelector("input").checked === true){
        conducteur.querySelector("input").checked = false ;
        selectedConfig.options.conducteurSupplementaire = false;
    }
    else {
        conducteur.querySelector("input").checked = true ;
        selectedConfig.options.conducteurSupplementaire = true;
    }
    ChargerPayement();
})












/*
 * AutoPark â€” Partie 2 : Composez votre location
 * Starter JavaScript â€” Ã  complÃ©ter par les apprenants.
 * Charger ce fichier dans votre HTML avec l'attribut defer.
 *
 * Parcours : vÃ©hicule et dates â†’ rÃ©cupÃ©ration â†’ options â†’ rÃ©capitulatif.
 * Les tarifs sont exprimÃ©s en MAD.
 */

// 1. CONFIGURATION : les donnÃ©es proposÃ©es par l'agence.
const config = {
    voitures: [
        {
            id: 1,
            marque: "Dacia",
            modele: "Sandero",
            immatriculation: "AUTO-001",
            categorie: "Citadine",
            prixJour: 250,
            statut: "Disponible",
        },
        {
            id: 2,
            marque: "Renault",
            modele: "Clio",
            immatriculation: "AUTO-002",
            categorie: "Citadine",
            prixJour: 300,
            statut: "Disponible",
        },
        {
            id: 3,
            marque: "Dacia",
            modele: "Duster",
            immatriculation: "AUTO-003",
            categorie: "SUV",
            prixJour: 450,
            statut: "Disponible",
        },
    ],

    modesRecuperation: [
        { id: "agence", nom: "Ã€ lâ€™agence", fraisFixes: 0 },
        { id: "aeroport", nom: "Ã€ lâ€™aÃ©roport", fraisFixes: 150 },
        { id: "adresse", nom: "Ã€ une adresse", fraisFixes: 100 },
    ],

    agences: ["Casablanca â€” Centre-ville", "Rabat â€” Agdal", "Marrakech â€” GuÃ©liz"],

    aeroports: ["Casablanca â€” Mohammed V", "Rabat â€” SalÃ©", "Marrakech â€” MÃ©nara"],

    options: [
        { id: "siegeBebe", nom: "SiÃ¨ge bÃ©bÃ©", prixParJour: 30 },
        {
            id: "conducteurSupplementaire",
            nom: "Conducteur supplÃ©mentaire",
            prixParJour: 200,
        },
    ],
};

// 2. SÃ‰LECTION : les choix de l'utilisateur, Ã  actualiser avec les formulaires.
// Les identifiants correspondent aux id dÃ©finis dans config.
// Les dates seront des chaÃ®nes au format AAAA-MM-JJ (valeur d'un input date).


/*
 * 3. Ã€ VOUS DE JOUER
 *
 * 1) SÃ©lectionner vos Ã©lÃ©ments HTML et afficher les voitures depuis config.
 * 2) Ã‰couter les Ã©vÃ©nements et mettre Ã  jour selectedConfig.
 *    Attention : la valeur d'un select est une chaÃ®ne ; voitureId est un nombre.
 *    Pour une case Ã  cocher, utiliser checked pour rÃ©cupÃ©rer true ou false.
 * 3) GÃ©rer les boutons PrÃ©cÃ©dent / Suivant et afficher une seule Ã©tape.
 * 4) Afficher les champs du mode de rÃ©cupÃ©ration sÃ©lectionnÃ©.
 *    Masquer et dÃ©sactiver les autres ; adapter required.
 * 5) Valider l'Ã©tape courante avant de passer Ã  la suivante.
 * 6) Calculer et actualiser le prix quand les choix changent.
 * 7) Afficher le rÃ©capitulatif des seuls champs concernÃ©s, puis confirmer.
 * 8) Permettre de recommencer avec les valeurs initiales.
 *
 * RÃˆGLES DU PRIX
 * - Les deux dates sont incluses : du 10 au 12 = 3 jours.
 * - Une location sur une mÃªme date = 1 jour.
 * - Le dÃ©but ne peut pas Ãªtre passÃ© ; la fin ne peut pas prÃ©cÃ©der le dÃ©but.
 * - Total = jours Ã— (prixParJour de la voiture + options par jour)
 *           + fraisFixes du mode de rÃ©cupÃ©ration.
 * - Les frais de rÃ©cupÃ©ration sont ajoutÃ©s une seule fois.
 * - Aucun renseignement supplÃ©mentaire pour le conducteur.
 * - Ne pas afficher un total numÃ©rique tant que la voiture ou les dates
 *   sont manquantes ou invalides.
 *
 * Exemple de contrÃ´le : Sandero, du 10 au 12, siÃ¨ge bÃ©bÃ©, aÃ©roport
 * â†’ 3 Ã— (250 + 30) + 150 = 990 MAD.
 */