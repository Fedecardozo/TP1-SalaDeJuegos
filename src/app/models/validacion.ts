import { Usuario } from './usuario';

export class Validacion {
  static login(email: string, password: string): boolean {
    if (Usuario.isValidEmail(email)) {
      //Alert mostrando un mensaje de que no es un email valido
      return false;
    } else if (Usuario.isValidPassword(password)) {
      //Alert mostrando un mensaje de que no es una contraseña valida
      return false;
    } else {
      //Es valido
      return true;
    }
  }
}
