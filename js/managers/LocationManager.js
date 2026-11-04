import { Location } from "../models/Location";

export class LocationManager {
    constructor() {
        if (localStorage.getItem("locations")) {
            this.locations = JSON.parse(localStorage.getItem("locations")).map(location => {
                return new Location(
                    location.id,
                    location.idClient,
                    location.idVoiture,
                    location.dateDebut,
                    location.dateFin,
                    location.recuperation,
                    location.options
                )
            });
        }
        else this.locations = [];
    }

    AjouterLocation(objetLocation) {
        this.locations.push(new Location(
            objetLocation.id,
            objetLocation.idClient,
            objetLocation.idVoiture,
            objetLocation.dateDebut,
            objetLocation.dateFin,
            objetLocation.recuperation,
            objetLocation.options
        )
        );

        localStorage.setItem("locations", JSON.stringify(this.locations))
    }

    AfficherLocation() {
        return this.locations;
    }
}