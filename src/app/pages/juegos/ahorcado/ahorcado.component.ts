import { Component, inject } from '@angular/core';
import { IngresarLetraComponent } from './ingresar-letra/ingresar-letra.component';
import { MostrarLetraComponent } from './mostrar-letra/mostrar-letra.component';
import { Alert } from '../../../models/alert';
import { Router } from '@angular/router';

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
    'CELULAR',
    'DINOSAURIO',
    'BANANA',
    'MANZANA',
    'NARANJA',
  ];
  router: Router = inject(Router);
  index: number = 0;
  palabra: string = this.palabras[this.index];
  palabraMostrar: string[] = [];
  contadorBuenas: number = 0;
  intentos: number = 5;

  ngOnInit(): void {
    this.cargarPalabraVacia();
  }

  private cargarPalabraVacia() {
    for (let index = 0; index < this.palabra.length; index++) {
      if (!index) this.palabraMostrar.push(this.palabra[index]);
      else this.palabraMostrar.push('');
    }
  }

  private verificar() {
    if (this.palabraMostrar.join('') === this.palabra) {
      Alert.ganar(
        'GANASTE!!!',
        '¿Desea jugar el siguiente nivel?',
        'Jugar siguiente nivel'
      ).then((result) => {
        if (result.isConfirmed) {
          this.siguienteNivel();
        } else this.router.navigateByUrl('/home');
      });
    } else if (this.intentos === 0) {
      //Asi muestra la imagen completa de cuando pierde
      setTimeout(() => {
        Alert.perder('PERDISTE!!!', '¿Desea repetir el nivel?').then(
          (result) => {
            if (result.isConfirmed) {
              this.repetirNivel();
            } else this.router.navigateByUrl('/home');
          }
        );
      }, 700);
    }
  }

  siguienteNivel() {
    this.index++;
    this.palabra = this.palabras[this.index];
    this.repetirNivel();
  }

  repetirNivel() {
    this.contadorBuenas = 0;
    this.intentos = 5;
    this.palabraMostrar = [];
    this.cargarPalabraVacia();
  }

  letraIngresada(letra: string) {
    let flag: boolean = false;
    for (let index = 0; index < this.palabra.length; index++) {
      if (
        this.palabra[index] === letra &&
        this.palabraMostrar[index] !== letra
      ) {
        this.contadorBuenas++;
        this.palabraMostrar[index] = letra;
        flag = true;
      }
    }

    if (!flag) {
      this.intentos--;
    }

    this.verificar();
  }
}
