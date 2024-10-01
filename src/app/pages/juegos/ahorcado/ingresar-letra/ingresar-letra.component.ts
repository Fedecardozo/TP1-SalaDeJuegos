import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ColorPickerModule } from 'primeng/colorpicker';
@Component({
  selector: 'app-ingresar-letra',
  standalone: true,
  imports: [
    ButtonModule,
    StyleClassModule,
    ToggleButtonModule,
    ColorPickerModule,
  ],
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
    'P',
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

  @Output() letraIngresada = new EventEmitter<string>();

  letraPresionada(letra: string) {
    this.letraIngresada.emit(letra);
  }
}
