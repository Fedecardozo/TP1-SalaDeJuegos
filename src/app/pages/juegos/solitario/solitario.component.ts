import { Component, inject } from '@angular/core';
import { DatabaseService } from '../../../auth/services/database.service';
import { Carta } from '../../../models/carta';
import { Subscription } from 'rxjs';
import { DragDropModule } from 'primeng/dragdrop';
import { Alert } from '../../../models/alert';

@Component({
  selector: 'app-solitario',
  standalone: true,
  imports: [DragDropModule],
  templateUrl: './solitario.component.html',
  styleUrl: './solitario.component.css',
})
export class SolitarioComponent {
  db: DatabaseService = inject(DatabaseService);
  draggedCarta?: Carta | null;
  cartas: Carta[] = [];
  cartasHeader1: Carta[] = [];
  cartasHeader2: Carta[] = [];
  cartasHeader3: Carta[] = [];
  cartasHeader4: Carta[] = [];
  cartasLateral1: Carta[] = [];
  cartasLateral2: Carta[] = [];
  cartasLateral3: Carta[] = [];
  cartasLateral4: Carta[] = [];
  newCartas: Carta[] = [];
  carpeta: string = '/cartas/';
  sub?: Subscription;
  spinner: boolean = true;
  referencia: Carta[] = [];

  ngOnInit(): void {
    //Cargo el array de cartas y obtengo la supcription
    this.sub = this.obtenerCartas();
  }

  obtenerCartas() {
    return this.db
      .getCartas()
      .valueChanges()
      .subscribe((next) => {
        //Obtengo las cartas
        const aux: Carta[] = next as Carta[];
        aux.forEach((card) => {
          this.cartas.push(new Carta(card.valor, card.palo, card.path));
        });

        //Obtenego de forma aleatorias las 4 cartas del encabezado
        const numRandom = this.numeroRandom(this.cartas.length - 4);

        //Cargar headers
        this.cargarHeader(this.cartas.splice(numRandom, 4));

        //Cargo las cartas para jugar
        this.barajar();

        //Ocultar spinner
        this.spinner = false;
      });
  }

  dragStart(card: Carta, array: Carta[]) {
    //Obtengo la carta que se esta por arrastrar
    this.draggedCarta = new Carta(card.valor, card.palo, card.path);
    console.log(this.draggedCarta);
    //Lugar de donde se obtuvo
    this.referencia = array;
  }

  dropHeader(numHeader: number) {
    //Soltar la carta
    if (this.draggedCarta && this.soltarHeader(numHeader)) {
      //Una vez que se solto saco el ultimo elemento del array
      this.referencia.pop();
    }
  }

  dropLateral(numLateral: number) {
    //Si la carta esta seleccionada y soltar es true ingresa y saco del array la carta
    if (this.draggedCarta && this.soltarLateral(numLateral)) {
      //Una vez que se solto saco el ultimo elemento del array
      this.referencia.pop();
    }
  }

  dragEnd() {
    //Una vez que se solto la carta lo vuelvo null
    this.draggedCarta = null;
    this.verificarJuego();
  }

  numeroRandom(max: number) {
    return Math.floor(Math.random() * max);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  cargarHeader(cartasHeader: Carta[]) {
    this.cartasHeader1.push(cartasHeader[0]);
    this.cartasHeader2.push(cartasHeader[1]);
    this.cartasHeader3.push(cartasHeader[2]);
    this.cartasHeader4.push(cartasHeader[3]);
  }

  barajar() {
    if (this.cartas.length >= 4) {
      //Obtengo de forma aleatoria 4 cartas del mazo
      const numNewCartas = this.numeroRandom(this.cartas.length - 4);
      const auxCartas: Carta[] = this.cartas.splice(numNewCartas, 4);
      auxCartas.forEach((card) => {
        this.newCartas.push(card);
      });
    } else {
      const auxCartas: Carta[] = this.cartas.splice(0, this.cartas.length);
      auxCartas.forEach((card) => {
        this.newCartas.push(card);
      });
    }
  }

  rebarajar() {
    //De las cartas que quedaron en juego las tengo que volver a barajar
    this.cartas = [...this.newCartas];
    this.newCartas = [];
  }

  soltarLateral(numLateral: number): boolean {
    if (this.draggedCarta) {
      switch (numLateral) {
        case 1:
          return this.draggedCarta.equalSoltarLateral(this.cartasLateral1);
        case 2:
          return this.draggedCarta.equalSoltarLateral(this.cartasLateral2);
        case 3:
          return this.draggedCarta.equalSoltarLateral(this.cartasLateral3);
        case 4:
          return this.draggedCarta.equalSoltarLateral(this.cartasLateral4);
      }
    }
    return false;
  }

  soltarHeader(numLateral: number): boolean {
    if (this.draggedCarta) {
      switch (numLateral) {
        case 1:
          return this.draggedCarta.equalSoltarHeader(this.cartasHeader1);
        case 2:
          return this.draggedCarta.equalSoltarHeader(this.cartasHeader2);
        case 3:
          return this.draggedCarta.equalSoltarHeader(this.cartasHeader3);
        case 4:
          return this.draggedCarta.equalSoltarHeader(this.cartasHeader4);
      }
    }
    return false;
  }

  verificarJuego() {
    if (
      this.cartasLateral1.length > 11 &&
      this.cartasLateral2.length > 11 &&
      this.cartasLateral3.length > 11 &&
      this.cartasLateral4.length > 11
    ) {
      Alert.ganar('GANASTE!!!', 'Complestate el juego!');
    }
  }
}
