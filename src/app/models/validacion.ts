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
  static regristrarse(
    email: string,
    password: string,
    password2: string
  ): boolean {
    if (!Validacion.login(email, password)) {
      return false;
    } else if (password != password2) {
      Alert.error(
        'Las contraseñas no son iguales!',
        'Verifique que las contraseñas sean iguales!'
      );
      return false;
    } else {
      return true;
    }
  }
}
