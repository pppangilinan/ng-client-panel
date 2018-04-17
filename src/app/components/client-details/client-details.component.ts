import { FlashMessagesService } from "angular2-flash-messages";
import { ClientService } from "./../../services/client.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { IClient } from "../../models/IClient";

@Component({
  selector: "app-client-details",
  templateUrl: "./client-details.component.html",
  styleUrls: ["./client-details.component.css"]
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: IClient;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];

    this.clientService.getClient(this.id).subscribe(client => {

      if (client.balance > 0) {
        this.hasBalance = true;
      }

      this.client = client;
    });
  }

  updateBalance(id: string) {
    this.clientService.updateClient(this.id, this.client);
    this.flashMessagesService.show("Balance Updated", { cssClass: "alert-success", timeout: 4000 });
    this.router.navigate(["/clients/", this.id]);
  }

  onDeleteClick() {
    if (confirm("Are you sure to delete?")) {
      this.clientService.deleteClient(this.id);
      this.flashMessagesService.show("Client Deleted", { cssClass: "alert-success", timeout: 4000 });
      this.router.navigate(["/"])
    }
  }
}
