import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
@Component({
  selector: 'app-ingresar-letra',
  standalone: true,
  imports: [ButtonModule, StyleClassModule],
  templateUrl: './ingresar-letra.component.html',
  styleUrl: './ingresar-letra.component.css',
})
export class IngresarLetraComponent {
  letras: string[] = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'Ñ',
    'O',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
}
