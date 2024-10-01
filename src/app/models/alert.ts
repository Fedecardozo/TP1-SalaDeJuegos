import Swal from 'sweetalert2';

/*En esta clase se personaliza los alerts para que quede centralizado en un mismo lugar */
export class Alert {
  private static obecjtStyle(
    titulo: string,
    msj: string,
    icono: string
  ): Object {
    return {
      title: titulo,
      text: msj,
      icon: icono,
    };
  }

  static error(titulo: string, msj: string) {
    const object = Alert.obecjtStyle('asd', 'asd', 'succes');
    Object.assign(object, {
      button: 'btn',
      hola: 'hola',
    });
    Swal.fire({
      title: titulo,
      text: msj,
      icon: 'error',
    });
  }

  static exito(titulo: string, msj: string, call: Function) {
    Swal.fire({
      title: titulo,
      text: msj,
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
    }).finally(() => {
      call();
    });
  }

  static exito2() {
    Swal.fire({
      title: 'GANASTE!!!',
      imageUrl: 'icon/win.gif',
      text: '¿Desea jugar el siguiente nivel?',
      confirmButtonText: 'Jugar siguiente nivel',
      cancelButtonText: 'Salir',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        //callback
        console.log('confirmo');
      }
    });
  }
}
