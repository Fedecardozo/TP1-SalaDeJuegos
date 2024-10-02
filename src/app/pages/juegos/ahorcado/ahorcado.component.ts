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
    'ELEFANTE',
    'DINOSAURIO',
    'BANANA',
    'MANZANA',
    'NARANJA',
  ];
  router: Router = inject(Router);
  index: number = 0;
  palabra: string = this.palabras[this.index];
  lenPalabra: number = this.palabra.length;
  palabraMostrar: string[] = [];
  contadorBuenas: number = 0;
  intentos: number = 5;

  ngOnInit(): void {
    this.cargarPalabraVacia();
  }

  private cargarPalabraVacia() {
    for (let index = 0; index < this.lenPalabra; index++) {
      if (!index) this.palabraMostrar.push(this.palabra[index]);
      else this.palabraMostrar.push('');
    }
  }

  private verificar() {
    if (this.contadorBuenas === this.lenPalabra - 1) {
      Alert.ganar().then((result) => {
        if (result.isConfirmed) {
          this.siguienteNivel();
        } else this.router.navigateByUrl('/home');
      });
    } else if (this.intentos === 0) {
      Alert.perder().then((result) => {
        if (result.isConfirmed) {
          this.repetirNivel();
        } else this.router.navigateByUrl('/home');
      });
    }
  }

  siguienteNivel() {
    this.index++;
    this.palabra = this.palabras[this.index];
    this.lenPalabra = this.palabra.length;
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
