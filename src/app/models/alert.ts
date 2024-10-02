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

  static ganar() {
    return Swal.fire({
      title: 'GANASTE!!!',
      imageUrl: 'icon/win.gif',
      imageWidth: 200,
      imageHeight: 200,
      text: '¿Desea jugar el siguiente nivel?',
      cancelButtonText: 'Salir',
      confirmButtonText: 'Jugar siguiente nivel',
      showCancelButton: true,
      customClass: {
        confirmButton: 'confirm-button-class',
        cancelButton: 'cancel-button-class',
      },
    });
  }

  static perder() {
    return Swal.fire({
      title: 'PERDISTE!!!',
      imageUrl: 'icon/perdiste.gif',
      imageWidth: 200,
      imageHeight: 200,
      text: '¿Desea repetir el nivel?',
      cancelButtonText: 'Salir',
      confirmButtonText: 'Repetir nivel',
      showCancelButton: true,
      customClass: {
        confirmButton: 'confirm-button-class',
        cancelButton: 'cancel-button-class',
      },
    });
  }
}
