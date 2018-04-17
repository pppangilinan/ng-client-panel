import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.register(this.email, this.password)
      .then((response) => {
        this.flashMessagesService.show("New user registered.", { cssClass: "alert-success", timeout: 4000 });
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.flashMessagesService.show(error.message, { cssClass: "alert-danger", timeout: 4000 });
        this.router.navigate(['/register']);
      });
  }

}
