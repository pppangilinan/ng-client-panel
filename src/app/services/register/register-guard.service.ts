import { SettingsService } from './../settings.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class RegisterGuardService implements CanActivate {

  constructor(
    private router: Router,
    private settingsService: SettingsService
  ) { }

  canActivate(): boolean {
    if (this.settingsService.getSettings().allowRegistration) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
