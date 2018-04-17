import { ClientService } from "./../../services/client.service";
import { Component, OnInit } from "@angular/core";
import { IClient } from "../../models/IClient";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { SettingsService } from "../../services/settings.service";

@Component({
  selector: "app-add-client",
  templateUrl: "./add-client.component.html",
  styleUrls: ["./add-client.component.css"]
})
export class AddClientComponent implements OnInit {
  client: IClient = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: 0
  };

  disableBalanceOnAdd: boolean = false;

  constructor(
    private clientService: ClientService,
    private settingsService: SettingsService,
    private flashMessagesService: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({ value, valid }: { value: IClient; valid: boolean }) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }

    if (!valid) {
      this.flashMessagesService.show("Please fill in all fields", {
        cssClass: "alert-danger",
        timeout: 4000
      });
      this.router.navigate(["add-client"]);
    } else {
      this.clientService.newClient(value);
      this.flashMessagesService.show("New client added", {
        cssClass: "alert-success",
        timeout: 4000
      });
      this.router.navigate(["/"]);
    }
  }
}
