export class Chat {
  id: string;
  correo: string;
  mensaje: string;
  fecha: number;

  constructor(id: string, fecha: number, correo: string, mensaje: string) {
    this.id = id;
    this.correo = correo;
    this.mensaje = mensaje;
    this.fecha = fecha;
  }

  getFecha(): string {
    return new Date(this.fecha).toLocaleString();
  }
}
