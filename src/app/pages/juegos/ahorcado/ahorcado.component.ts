import { Component } from '@angular/core';
import { IngresarLetraComponent } from './ingresar-letra/ingresar-letra.component';
import { MostrarLetraComponent } from './mostrar-letra/mostrar-letra.component';
import { Alert } from '../../../models/alert';

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

  index: number = 4;
  palabra: string = this.palabras[this.index];
  lenPalabra: number = this.palabra.length;
  palabraMostrar: string[] = [];
  contadorBuenas: number = 0;
  intentos: number = 5;

  ngOnInit(): void {
    for (let index = 0; index < this.lenPalabra; index++) {
      if (!index) this.palabraMostrar.push(this.palabra[index]);
      else this.palabraMostrar.push('');
    }
  }

  private verificar() {
    if (this.contadorBuenas === this.lenPalabra - 1) {
      console.log('ganaste');
      Alert.exito2();
    } else if (this.intentos === 0) {
      console.log('perdiste');
    }
  }

  letraIngresada(letra: string) {
    let flag: boolean = false;
    for (let index = 0; index < this.lenPalabra; index++) {
      if (this.palabra[index] === letra) {
        this.contadorBuenas++;
        this.palabraMostrar[index] = letra;
        flag = true;
      }
    }

    if (!flag) this.intentos--;
    this.verificar();
  }
}
