import { IClient } from "./../models/IClient";
import { Injectable } from "@angular/core";
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class ClientService {
  clients: FirebaseListObservable<any[]>;
  client: FirebaseObjectObservable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.clients = this.db.list("/clients") as FirebaseListObservable<IClient[]>;
  }

  getClients() {
    return this.clients;
  }

  getClient(id: string) {
    return this.db.object("/clients/" + id) as FirebaseObjectObservable<IClient>;
  }

  newClient(client: IClient) {
    this.clients.push(client);
  }

  updateClient(id: string, client: IClient) {
    return this.clients.update(id, client);
  }

  deleteClient(id: string) {
    this.clients.remove(id);
  }
}
