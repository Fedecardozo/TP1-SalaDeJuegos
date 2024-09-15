import { Alert } from './alert';
import { Usuario } from './usuario';

/*Esta clase valida y muestra mensaje alerts  */
export class Validacion {
  static login(email: string, password: string): boolean {
    if (!Usuario.isValidEmail(email)) {
      Alert.error('Email invalido', 'ejemplo@entidad.com');
      return false;
    } else if (!Usuario.isValidPassword(password)) {
      Alert.error(
        'Contraseña invalida',
        'Debe contener como minimo 6 caracteres'
      );
      return false;
    } else {
      //Es valido
      return true;
    }
  }
}
