import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mostrar-letra',
  standalone: true,
  imports: [],
  templateUrl: './mostrar-letra.component.html',
  styleUrl: './mostrar-letra.component.css',
})
export class MostrarLetraComponent {
  @Input() palabra: string = '';
}
