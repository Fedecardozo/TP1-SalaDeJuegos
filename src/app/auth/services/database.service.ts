import { Injectable } from '@angular/core';
// import { addDoc, collection, Firestore } from "@angular/fire/firestore";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from '../../models/usuario';
import { LogUsuario } from '../../models/log-usuario';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private firestore: AngularFirestore) {}

  agregarUsuario(user: Usuario) {
    const colUsuarios = this.firestore.collection('usuarios');
    const documento = colUsuarios.doc(user.email);
    // user.setId(documento.ref.id);
    documento.set({ ...user });
  }

  addLogsUser(correo: string) {
    const colUsuarios = this.firestore.collection('logsUsuarios');
    const documento = colUsuarios.doc();
    documento.set({ ...new LogUsuario(correo, documento.ref.id) });
  }

  getUserByIdOnce(email: string): void {
    this.firestore
      .collection('usuarios')
      .doc(email)
      .get()
      .subscribe((doc) => {
        if (doc.exists) {
          // console.log('User data:', doc.data());
          const user: Usuario = {
            ...(doc.data() as Usuario),
          };
          // console.log(user);
        }
      });
  }
}
