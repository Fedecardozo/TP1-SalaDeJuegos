export class Carta {
  palo: string;
  valor: number;
  path: string;

  constructor(valor: number, palo: string, path: string) {
    this.palo = palo;
    this.valor = valor;
    this.path = path;
  }
}
