import { Component, inject } from '@angular/core';
import { UsersService } from '../../auth/services/users.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../../auth/services/database.service';
import { Subscription } from 'rxjs';
import { Chat } from '../../models/chat';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  userService: UsersService = inject(UsersService);
  db: DatabaseService = inject(DatabaseService);
  value: string = '';
  subcripcion?: Subscription;
  listMessages: Chat[] = [];

  enviarMsj() {
    if (this.value !== '' && this.userService.correo) {
      this.db.addChat(this.value, this.userService.correo);
      this.value = '';
    }
  }

  convertirFecha(fecha: number) {
    return new Date(fecha).toLocaleString();
  }

  ngOnInit(): void {
    this.subcripcion = this.db
      .getChats()
      .valueChanges()
      .subscribe((next) => {
        console.log(next);
        this.listMessages = next as Chat[];
      });
  }

  ngOnDestroy(): void {
    console.log('se ejecuto destroy');
    this.subcripcion?.unsubscribe();
  }
}
