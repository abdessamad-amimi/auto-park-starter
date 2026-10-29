import { Voiture } from "../models/Voiture.js";

export class ManagerVoiture {
    constructor() {
        if (localStorage.getItem("data")) {
            this.voitures = JSON.parse(localStorage.getItem("data")).map(voiture =>
                new Voiture(voiture.id, voiture.marque, voiture.modele, voiture.immatriculation, voiture.categorie, voiture.prixJour, voiture.statut)
            );
        }
        else this.voitures = [];
    }

    AjouterVoiture(voitureObjet) {
        this.voitures.push(new Voiture(voitureObjet.id, voitureObjet.marque, voitureObjet.modele, voitureObjet.immatriculation, voitureObjet.categorie, voitureObjet.prixJour, voitureObjet.statut));
        localStorage.setItem("data", JSON.stringify(this.voitures));
    }

    AfficherVoiture() {
        return this.voitures;
    }

    ModifierVoiture(id, newVoiture) {
        const voiture = this.voitures.find(v => v.id === id);
        const index = this.voitures.indexOf(voiture);
        if (index === -1) return
        this.voitures[index] = newVoiture;
        localStorage.setItem("data", JSON.stringify(this.voitures));
    }

    SupprimerVoiture(id) {
        this.voitures = this.voitures.filter(voiture => voiture.id !== id);
        localStorage.setItem("data", JSON.stringify(this.voitures));
    }

    RechercherVoiture(array, input) {
        let filtredData = array.filter((data) =>
            data.marque.toLowerCase().startsWith(input.toLowerCase()) ||
            data.modele.toLowerCase().startsWith(input.toLowerCase()) ||
            data.immatriculation.toLowerCase().startsWith(input.toLowerCase()) ||
            data.categorie.toLowerCase().startsWith(input.toLowerCase())
        );
        return filtredData
    }

    FilterStatut(array, input) {
        if (input === "") return array;
        let filtredData = array.filter((data) =>
            data.statut.toLowerCase() === input.toLowerCase()
        );
        return filtredData
    }

    FilterCategorie(array, input) {
        if (input === "") return array;
        let filtredData = array.filter((data) =>
            data.categorie.toLowerCase() === input.toLowerCase()
        );
        return filtredData
    }

    TrieArray(array, choice) {
        let croissant = (a, b) => {
            if (a.prixJour < b.prixJour) {
                return -1;
            }
            if (a.prixJour > b.prixJour) {
                return 1;
            }
            return 0;
        };

        let decroissant = (a, b) => {
            if (a.prixJour > b.prixJour) {
                return -1;
            }
            if (a.prixJour < b.prixJour) {
                return 1;
            }
            return 0;
        };

        const tris = {
            croissant: croissant,
            decroissant: decroissant
        };
        if (choice === "") return array;
        return array.sort(tris[choice]);
    }
}