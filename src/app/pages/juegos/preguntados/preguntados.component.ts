import { Component, inject } from '@angular/core';
import { Pais } from '../../../models/pais';
import { ApiService } from '../../../auth/services/api.service';
import { Subscription } from 'rxjs';
import { Alert } from '../../../models/alert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css',
})
export class PreguntadosComponent {
  router: Router = inject(Router);
  private apiRest: ApiService = inject(ApiService);
  listaPaises: Pais[] = [];
  pais: Pais | null = null;
  sub?: Subscription;
  opciones: string[] = [];
  opcOk?: number;
  puntos: number = 0;

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

      this.cargarPais();
      this.cargarOpciones();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  cargarPais() {
    if (this.listaPaises.length) {
      const num: number = this.numeroRandom(this.listaPaises.length - 1);
      this.pais = this.listaPaises.splice(num, 1)[0];
    }
  }

  cargarOpciones() {
    //Obtener un array de 3 paises
    const num: number = this.numeroRandom(this.listaPaises.length - 4);
    const aux: Pais[] = this.listaPaises.slice(num, num + 4);

    //Cargar las opciones de manera aletoria
    this.opcOk = this.numeroRandom(4);

    console.log(this.opcOk + 1);

    for (let index = 0; index < 4; index++) {
      if (this.pais) {
        if (this.opcOk === index) {
          this.opciones.push(this.pais.nombre);
        } else {
          this.opciones.push(aux[index].nombre);
        }
      }
    }
  }

  verificar(opc: number) {
    //devuelvo el pais al array
    if (this.pais) {
      this.listaPaises.push(this.pais);
    }

    if (this.opcOk === opc) {
      Alert.ganar(
        'GANASTE!!',
        '¿Desea jugar el siguiente nivel?',
        'Jugar siguiente nivel'
      ).then((res) => {
        if (res.isConfirmed) {
          this.reiniciarJuego();
        } else {
          this.router.navigateByUrl('/home');
        }
      });
    } else {
      Alert.perder('PERDISTE!!', '¿Desea jugar de nuevo?').then((res) => {
        if (res.isConfirmed) {
          this.reiniciarJuego();
        } else {
          this.router.navigateByUrl('/home');
        }
      });
    }
  }

  reiniciarJuego() {
    this.pais = null;
    this.opciones = [];
    this.opcOk = undefined;
    this.puntos = this.puntos + 100;
    this.cargarPais();
    this.cargarOpciones();
  }

  numeroRandom(max: number) {
    return Math.floor(Math.random() * max);
  }
}
