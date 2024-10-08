import { Component, inject } from '@angular/core';
import { DatabaseService } from '../../../auth/services/database.service';
import { Carta } from '../../../models/carta';
import { Subscription } from 'rxjs';
import { DragDropModule } from 'primeng/dragdrop';

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
  newCartas: Carta[] = [];
  carpeta: string = '/cartas/';
  sub?: Subscription;
  spinner: boolean = true;

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
        this.cartas = next as Carta[];

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

  dragStart(card: Carta) {
    //Obtengo la carta que se esta por arrastrar
    this.draggedCarta = card;
    console.log('start');
    console.log(this.draggedCarta);
  }

  drop() {
    //Soltar la carta
    if (this.draggedCarta) {
      //Una vez que se solto lo tengo que sacar del array
      this.newCartas = this.newCartas.filter(
        (item) => item !== this.draggedCarta
      );
      this.cartasHeader1.push(this.draggedCarta);
    }
  }

  dragEnd() {
    //Una vez que se solto la carta lo vuelvo null
    this.draggedCarta = null;
    console.log('end');
    console.log(this.draggedCarta);
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
    }
  }

  rebarajar() {
    //De las cartas que quedaron en juego las tengo que volver a barajar
    this.cartas = [...this.newCartas];
    this.newCartas = [];
  }
}
