import { Component, inject } from '@angular/core';
import { DatabaseService } from '../../../auth/services/database.service';
import { Carta } from '../../../models/carta';
import { Subscription } from 'rxjs';
import { DragDropModule } from 'primeng/dragdrop';
import { Alert } from '../../../models/alert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solitario',
  standalone: true,
  imports: [DragDropModule],
  templateUrl: './solitario.component.html',
  styleUrl: './solitario.component.css',
})
export class SolitarioComponent {
  router: Router = inject(Router);
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
  newArray: Carta[] = [];
  ubiIndex: number = -1;

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

    //Lugar de donde se obtuvo
    this.referencia = array;
  }

  dragStartHeader(card: Carta, array: Carta[]) {
    //Obtengo la carta que se esta por arrastrar
    this.draggedCarta = new Carta(card.valor, card.palo, card.path);

    //Ubicar la carta en el array
    this.ubiIndex = array.indexOf(card);

    //Crear un nuevo array
    this.newArray = array.slice(this.ubiIndex, array.length);

    //Lugar de donde se obtuvo
    this.referencia = array;
  }

  dropHeader(numHeader: number) {
    //Evaluo si quieren soltar muchas cartas
    if (this.newArray.length && this.soltarVariasHeader(numHeader)) {
      //Logica
      this.referencia.splice(this.ubiIndex, this.referencia.length);
    }
    //Soltar la carta
    else if (this.draggedCarta && this.soltarHeader(numHeader)) {
      //Una vez que se solto saco el ultimo elemento del array
      this.referencia.pop();
    }
  }

  dropLateral(numLateral: number) {
    //Si la carta esta seleccionada y soltar es true ingresa y saco del array la carta
    if (this.draggedCarta && this.soltarLateral(numLateral)) {
      //Una vez que se solto saco el ultimo elemento del array
      this.referencia.pop();
      //Verifico si gano
      this.verificarJuego();
    }
  }

  dragEnd() {
    //Una vez que se solto la carta lo vuelvo null
    this.draggedCarta = null;
    this.newArray = [];
    this.ubiIndex = -1;
  }

  numeroRandom(max: number) {
    return Math.floor(Math.random() * max);
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

  soltarHeader(numHeader: number): boolean {
    if (this.draggedCarta) {
      switch (numHeader) {
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

  soltarVariasHeader(numHeader: number): boolean {
    if (this.newArray) {
      switch (numHeader) {
        case 1:
          return Carta.equalsSoltarVariasHeader(
            this.cartasHeader1,
            this.newArray
          );
        case 2:
          return Carta.equalsSoltarVariasHeader(
            this.cartasHeader2,
            this.newArray
          );

        case 3:
          return Carta.equalsSoltarVariasHeader(
            this.cartasHeader3,
            this.newArray
          );

        case 4:
          return Carta.equalsSoltarVariasHeader(
            this.cartasHeader4,
            this.newArray
          );
      }
    }
    return false;
  }

  reiniciarJuego() {
    this.spinner = true;
    this.cartasHeader1 = [];
    this.cartasHeader2 = [];
    this.cartasHeader3 = [];
    this.cartasHeader4 = [];
    this.cartasLateral1 = [];
    this.cartasLateral2 = [];
    this.cartasLateral3 = [];
    this.cartasLateral4 = [];
    this.sub?.unsubscribe();
    this.obtenerCartas();
  }

  verificarJuego() {
    if (
      this.cartasLateral1.length > 9 &&
      this.cartasLateral2.length > 9 &&
      this.cartasLateral3.length > 9 &&
      this.cartasLateral4.length > 9
    ) {
      Alert.ganar(
        'GANASTE!!!',
        '¿Quieres jugar de nuevo?',
        'Repetir juego'
      ).then((result) => {
        if (result.isConfirmed) {
          this.reiniciarJuego();
        } else this.router.navigateByUrl('/home');
      });
    }
  }
}
