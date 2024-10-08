export class Carta {
  palo: string;
  valor: number;
  path: string;

  constructor(valor: number, palo: string, path: string) {
    this.palo = palo;
    this.valor = valor;
    this.path = path;
  }

  equals(carta: Carta) {
    return this.equalsPalo(carta) && carta.valor === this.valor;
  }

  equalsPalo(carta: Carta) {
    return carta.palo === this.palo;
  }

  esValorSiguiente(carta: Carta) {
    let valor = carta.valor + 1;
    if (valor === 8) {
      valor = valor + 2;
    }
    return valor === this.valor;
  }

  esValorAnterior(carta: Carta) {
    let valor = carta.valor - 1;
    if (valor === 9) {
      valor = valor - 2;
    }
    return valor === this.valor;
  }

  equalSoltarLateral(cartasLateral: Carta[]): boolean {
    //Si el array esta vacio y la carta es un 1 lo cargo en el array
    if (this.valor === 1 && !cartasLateral.length) {
      cartasLateral.push(this);
      return true;
    }
    //Si la carta es del mismo palo y es siguiente valor ejemplo this.valor = 2 y lateral.valor = 1 lo cargo
    else if (
      this.equalsPalo(cartasLateral[cartasLateral.length - 1]) &&
      cartasLateral.length &&
      this.esValorSiguiente(cartasLateral[cartasLateral.length - 1])
    ) {
      cartasLateral.push(this);
      return true;
    }
    return false;
  }

  equalSoltarHeader(cartasHeader: Carta[]): boolean {
    //Si el valor es 12 y el array esta vacio lo cargo
    if (this.valor === 12 && !cartasHeader.length) {
      cartasHeader.push(this);
      return true;
    }
    //Si son de distinto palo y el array no esta vacio y el valor es el anterior lo cargo
    else if (
      !this.equalsPalo(cartasHeader[cartasHeader.length - 1]) &&
      cartasHeader.length &&
      this.esValorAnterior(cartasHeader[cartasHeader.length - 1])
    ) {
      cartasHeader.push(this);
      return true;
    }
    return false;
  }

  static equalsSoltarVariasHeader(
    cartasHeader: Carta[],
    newCartas: Carta[]
  ): boolean {
    //Si las nuevas cartas empiezan con 12 y el array esta vacio las carga
    if (newCartas[0].valor === 12 && !cartasHeader.length) {
      newCartas.forEach((item) => {
        cartasHeader.push(item);
      });
      return true;
    }
    //Si el array no esta vacio y la primera carta el anterior de distinto palo la cargo
    else if (
      cartasHeader.length &&
      !newCartas[0].equalsPalo(cartasHeader[cartasHeader.length - 1]) &&
      newCartas[0].esValorAnterior(cartasHeader[cartasHeader.length - 1])
    ) {
      newCartas.forEach((item) => {
        cartasHeader.push(item);
      });
      return true;
    }
    return false;
  }
}
