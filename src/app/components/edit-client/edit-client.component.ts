import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { IClient } from '../../models/IClient';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  id: string;

  client: IClient = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: 0
  };

  disableBalanceOnEdit: boolean = true;

  constructor(
    private clientService: ClientService,
    private settingsService: SettingsService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];

    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
    });

    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
  }

  onSubmit({ value, valid }: { value: IClient; valid: boolean }) {
    if (!valid) {
      this.flashMessagesService.show("Please fill in all fields", {
        cssClass: "alert-danger",
        timeout: 4000
      });
      this.router.navigate(["edit-client/", this.id]);
    } else {
      this.clientService.updateClient(this.id, value);
      this.flashMessagesService.show("Client updated", {
        cssClass: "alert-success",
        timeout: 4000
      });
      this.router.navigate(["/client/", this.id]);
    }
  }

}
