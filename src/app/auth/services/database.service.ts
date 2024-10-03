import { Injectable } from '@angular/core';
// import { addDoc, collection, Firestore } from "@angular/fire/firestore";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from '../../models/usuario';
import { LogUsuario } from '../../models/log-usuario';
import { Chat } from '../../models/chat';
import { Carta } from '../../models/carta';

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

  addChat(message: string, correo: string) {
    const colChats = this.firestore.collection('chats');
    const fecha = Date.now();
    const documento = colChats.doc('' + fecha);
    documento.set({
      ...new Chat(documento.ref.id, fecha, correo, message),
    });
  }

  getChats() {
    const col = this.firestore.collection('chats');
    return col;
  }

  getCartas() {
    const col = this.firestore.collection('cartas');
    return col;
  }
}
