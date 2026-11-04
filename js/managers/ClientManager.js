import { Client } from "../models/Client";

export class ClientManager{
    constructor(){
        if(localStorage.getItem("clients")){
            this.clients = JSON.parse(localStorage.getItem("client")).map((client) => {
                return new Client(client.id, client.nom, client.telephone, client.email);
            })
        }
        else this.clients = [];
    }

    AjouterClient(clientObjet){
        this.clients.push(new Client(
            clientObjet.id,
            clientObjet.nom,
            clientObjet.telephone,
            clientObjet.email
        ));

        localStorage.setItem("clients" , JSON.stringify(this.clients));
    }

    AfficherClient(){
        return this.clients;
    }
}