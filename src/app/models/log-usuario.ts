export class LogUsuario {
  correo: string;
  fecha_ingreso: number;
  id: string;

  constructor(correo: string, id: string) {
    this.correo = correo;
    this.fecha_ingreso = Date.now();
    this.id = id;
  }
}
