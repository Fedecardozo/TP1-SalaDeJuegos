import { Component, inject } from '@angular/core';
import { DatabaseService } from '../../../auth/services/database.service';
import { Carta } from '../../../models/carta';
import { Subscription } from 'rxjs';
import { Alert } from '../../../models/alert';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cartas',
  standalone: true,
  imports: [],
  templateUrl: './cartas.component.html',
  styleUrl: './cartas.component.css',
})
export class CartasComponent {
  router: Router = inject(Router);
  puntos: number = 0;
  db: DatabaseService = inject(DatabaseService);
  cartas: Carta[] = [];
  path: string = '';
  carta?: Carta;
  cartaAnterior?: Carta;
  sub?: Subscription;
  siguienteCartaPath: string = '';
  carpeta: string = '/cartas/';

  ngOnInit(): void {
    //Cargo el array de cartas y obtengo la supcription
    this.sub = this.obtenerCartas();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  obtenerCartas() {
    return this.db
      .getCartas()
      .valueChanges()
      .subscribe((next) => {
        //Obtengo las cartas
        this.cartas = next as Carta[];
        //Muestro las cartas en pantalla
        this.mostrarCartaInicio();
      });
  }

  mostrarCartaInicio() {
    const indexAzar: number = this.numeroRandom(this.cartas.length);
    //Saco del array la carta que obtengo
    this.carta = this.cartas.splice(indexAzar, 1)[0];
    //Muestro la imagen en pantalla de la carta
    this.path = this.carpeta + this.carta.path;
  }

  cartaSiguiente() {
    const indexAzar: number = this.numeroRandom(this.cartas.length);
    //Guardo la carta actual
    this.cartaAnterior = this.carta;
    //Obtengo una nueva carta para mostrar y reemplazar la anterior
    this.carta = this.cartas.splice(indexAzar, 1)[0];
    //Muestro en la pantalla la carta obtenida
    this.siguienteCartaPath = this.carpeta + this.carta.path;
  }

  verificarMayor() {
    //Antes de verificar muestro la carta siguiente
    this.cartaSiguiente();

    //Espero 2 segundos asi lo puede visualizar
    setTimeout(() => {
      if (this.carta && this.cartaAnterior) {
        if (this.carta?.valor >= this.cartaAnterior?.valor) {
          this.ganar();
        } else {
          this.perder();
        }
        //Reinicio para que la carta no se oculte
        this.siguienteCartaPath = '';
        //Sobreescribo con la carta nueva
        this.path = this.carpeta + this.carta.path;
      }
    }, 1800);
  }

  verificarMenor() {
    //Antes de verificar muestro la carta siguiente
    this.cartaSiguiente();

    //Espero 2 segundos asi lo puede visualizar
    setTimeout(() => {
      if (this.carta && this.cartaAnterior) {
        if (this.carta?.valor < this.cartaAnterior?.valor) {
          this.ganar();
        } else {
          this.perder();
        }
        //Reinicio para que la carta no se oculte
        this.siguienteCartaPath = '';
        //Sobreescribo con la carta nueva
        this.path = this.carpeta + this.carta.path;
      }
    }, 1800);
  }

  numeroRandom(max: number) {
    return Math.floor(Math.random() * max);
  }

  perder() {
    Alert.perder('PERDISTE!!!', 'Puntos obtenidos ' + this.puntos).then(
      (result) => {
        if (result.isConfirmed) {
          // Reiniciar juego
          this.reiniciarJuego();
        } else this.router.navigateByUrl('/home');
      }
    );
  }

  ganar() {
    Alert.ganador('GANASTE!!!', 'Sumaste 100 puntos');
    this.puntos = this.puntos + 100;
  }

  reiniciarJuego() {
    this.sub?.unsubscribe();
    this.path = '';
    this.sub = this.obtenerCartas();
    this.puntos = 0;
  }
}
