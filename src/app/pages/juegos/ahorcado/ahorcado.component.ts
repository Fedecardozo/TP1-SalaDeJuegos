import { Component } from '@angular/core';
import { IngresarLetraComponent } from './ingresar-letra/ingresar-letra.component';
import { MostrarLetraComponent } from './mostrar-letra/mostrar-letra.component';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [IngresarLetraComponent, MostrarLetraComponent],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css',
})
export class AhorcadoComponent {
  palabras: string[] = [
    'PERRO',
    'GATO',
    'ELEFANTE',
    'DINOSAURIO',
    'BANANA',
    'MANZANA',
    'NARANJA',
  ];

  index: number = 0;
  palabra = this.palabras[this.index];
}
