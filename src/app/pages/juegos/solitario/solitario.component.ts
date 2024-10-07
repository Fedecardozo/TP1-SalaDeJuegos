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
        this.newCartas = this.cartas.slice(1, 10);
        console.log(this.cartas.slice(1, 10));
        this.path = 'as';
      });
  }
}
