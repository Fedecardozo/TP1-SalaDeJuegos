import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  Unsubscribe,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private auth: Auth = inject(Auth);
  private unSuscribe?: Unsubscribe;
  constructor() {}

  sesion(call: Function, callElse?: Function) {
    this.unSuscribe = this.auth.onAuthStateChanged((auth) => {
      console.log(auth);
      if (auth?.email) {
        call();
      } else {
        if (callElse !== undefined) {
          callElse();
        }
      }
    });
  }

  desuscribir() {
    if (this.unSuscribe !== undefined) {
      this.unSuscribe();
    }
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  registrarse(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  cerrarSesion() {
    this.auth.signOut();
  }
}
