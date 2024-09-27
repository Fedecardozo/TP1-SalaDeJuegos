import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  Unsubscribe,
  User,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private auth: Auth = inject(Auth);
  private unSuscribe?: Unsubscribe;
  private user: User | null = null;

  sesion(call: Function, call2?: Function) {
    this.unSuscribe = this.auth.onAuthStateChanged((auth) => {
      if (auth?.email) {
        call(this.auth.currentUser?.email);
      } else if (call2 !== undefined) {
        call2();
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
