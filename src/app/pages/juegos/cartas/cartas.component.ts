import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DatabaseService } from '../../../auth/services/database.service';
import { Carta } from '../../../models/carta';
import { Subscription } from 'rxjs';
import { Alert } from '../../../models/alert';
@Component({
  selector: 'app-cartas',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './cartas.component.html',
  styleUrl: './cartas.component.css',
})
export class CartasComponent {
  puntos: number = 100;
  db: DatabaseService = inject(DatabaseService);
  cartas: Carta[] = [];
  path: string = '';
  carta?: Carta;
  cartaAnterior?: Carta;
  sub?: Subscription;
  siguienteCartaPath: string = '';
  carpeta: string = '/cartas/';

  ngOnInit(): void {
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
        this.cartas = next as Carta[];
        this.mostrarCartaInicio();
      });
  }

  mostrarCartaInicio() {
    const indexAzar: number = this.numeroRandom(this.cartas.length);
    this.carta = this.cartas.splice(indexAzar, 1)[0];
    this.path = this.carpeta + this.carta.path;
  }

  cartaSiguiente() {
    const indexAzar: number = this.numeroRandom(this.cartas.length);
    this.cartaAnterior = this.carta;
    this.carta = this.cartas.splice(indexAzar, 1)[0];
    this.siguienteCartaPath = this.carpeta + this.carta.path;
  }

  verificarMayor() {
    this.cartaSiguiente();

    setTimeout(() => {
      if (this.carta && this.cartaAnterior) {
        if (this.carta?.valor >= this.cartaAnterior?.valor) {
          Alert.ganar();
          this.puntos = this.puntos + 100;
        } else {
          Alert.perder();
        }
        this.siguienteCartaPath = '';
        this.path = this.carpeta + this.carta.path;
      }
    }, 2000);
  }

  verificarMenor() {
    this.cartaSiguiente();

    setTimeout(() => {
      if (this.carta && this.cartaAnterior) {
        if (this.carta?.valor < this.cartaAnterior?.valor) {
          Alert.ganar();
          this.puntos = this.puntos + 100;
        } else {
          Alert.perder();
        }
        this.siguienteCartaPath = '';
        this.path = this.carpeta + this.carta.path;
      }
    }, 2000);
  }

  numeroRandom(max: number) {
    return Math.floor(Math.random() * max);
  }
}
