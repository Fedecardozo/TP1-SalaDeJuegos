import Swal from 'sweetalert2';

/*En esta clase se personaliza los alerts para que quede centralizado en un mismo lugar */
export class Alert {
  static error(titulo: string, msj: string) {
    Swal.fire({
      title: titulo,
      text: msj,
      icon: 'error',
    });
  }

  static exito(titulo: string, msj: string) {
    Swal.fire({
      title: titulo,
      text: msj,
      icon: 'success',
    });
  }
}
