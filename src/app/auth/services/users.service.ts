import { inject, Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private auth: Auth = inject(Auth);
  constructor() {}

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}
