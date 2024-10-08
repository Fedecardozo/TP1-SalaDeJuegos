import { Component, inject } from '@angular/core';
import { DatabaseService } from '../../../auth/services/database.service';
import { Carta } from '../../../models/carta';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-solitario',
  standalone: true,
  imports: [],
  templateUrl: './solitario.component.html',
  styleUrl: './solitario.component.css',
})
export class SolitarioComponent {
  db: DatabaseService = inject(DatabaseService);
  carta?: Carta;
  cartas: Carta[] = [];
  cartasHeader: Carta[] = [];
  newCartas: Carta[] = [];
  carpeta: string = '/cartas/';
  sub?: Subscription;
  path: string = '';

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
        const numRandom = this.numeroRandom(this.cartas.length - 4);
        this.cartasHeader = this.cartas.splice(numRandom, 4);
        const numNewCartas = this.numeroRandom(this.cartas.length - 4);
        this.newCartas = this.cartas.splice(numNewCartas, 4);

        console.log(numRandom);
        console.log(this.cartasHeader);
        console.log(this.newCartas);
        console.log(this.cartas);
        this.path = 'as';
      });
  }

  numeroRandom(max: number) {
    return Math.floor(Math.random() * max);
  }
}
