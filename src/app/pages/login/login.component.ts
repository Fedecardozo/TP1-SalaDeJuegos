import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  validarEmail() {
    if (Usuario.isValidEmail(this.email)) {
      console.log('Es un email valido');
    } else {
      console.log('No es un email valido');
    }
  }
}
