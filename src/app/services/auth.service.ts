import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.auth.auth.signInWithEmailAndPassword(email, password)
        .then(user => resolve(user), error => reject(error));
    });
  }

  // check user status
  getAuth() {
    return this.auth.authState.map(auth => auth);
  }

  logout() {
    return this.auth.auth.signOut();
  }

  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.auth.auth.createUserWithEmailAndPassword(email, password)
        .then(user => resolve(user),
          error => reject(error));
    });
  }

}
