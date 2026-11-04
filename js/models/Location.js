export class Location {
    constructor(id, idClient, idVoiture, dateDebut, dateFin, recuperation, options) {
        this.id = id;
        this.idClient = idClient,
        this.idVoiture = idVoiture,
        this.dateDebut = dateDebut,
        this.dateFin = dateFin,
        this.recuperation = recuperation,
        this.option = options
    }
}