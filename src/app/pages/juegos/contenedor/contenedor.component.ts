import { Component } from '@angular/core';
import { ChatComponent } from '../../chat/chat.component';

@Component({
  selector: 'app-contenedor',
  standalone: true,
  imports: [ChatComponent],
  templateUrl: './contenedor.component.html',
  styleUrl: './contenedor.component.css',
})
export class ContenedorComponent {}
