import { Component, inject } from '@angular/core';
import { Pais } from '../../../models/pais';
import { ApiService } from '../../../auth/services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css',
})
export class PreguntadosComponent {
  listaPaises: Pais[] = [];
  private apiRest: ApiService = inject(ApiService);
  pais: Pais | null = null;
  sub?: Subscription;

  ngOnInit(): void {
    this.sub = this.apiRest.getPaises().subscribe((paises: any) => {
      paises.map((auxPais: any) => {
        let pais: Pais = new Pais(
          auxPais.name.common,
          auxPais.region,
          auxPais.flags.svg
        );

        this.listaPaises.push(pais);
      });

      console.log(this.listaPaises);
      this.cargarPais();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  cargarPais() {
    if (this.listaPaises.length) {
      console.log('entro');
      this.pais =
        this.listaPaises[this.numeroRandom(this.listaPaises.length - 1)];
      console.log(this.pais);
    }
  }

  numeroRandom(max: number) {
    return Math.floor(Math.random() * max);
  }
}
