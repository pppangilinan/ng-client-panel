import { IClient } from "./../../models/IClient";
import { ClientService } from "./../../services/client.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.css"]
})
export class ClientsComponent implements OnInit {
  $clients: IClient[];
  totalOwed: number;

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {
      this.$clients = clients;
      this.getTotalOwed();
    });
  }

  getTotalOwed() {
    let total = 0;
    for (let i = 0; i < this.$clients.length; i++) {
      total += parseFloat(this.$clients[i].balance.toString());
    }

    this.totalOwed = total;
  }
}
