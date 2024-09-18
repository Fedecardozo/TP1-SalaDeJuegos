import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Validacion } from '../../models/validacion';
import { UsersService } from '../../auth/services/users.service';
import { Alert } from '../../models/alert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ButtonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  email: string = '';
  password: string = '';
  password2: string = '';
  oculto: boolean = true;
  private userService: UsersService = inject(UsersService);
  private router: Router = inject(Router);

  registrarse() {
    if (Validacion.regristrarse(this.email, this.password, this.password2)) {
      this.userService
        .registrarse(this.email, this.password)
        .then(() => {
          Alert.exito(
            'Se registro exitosamente!',
            'Redirigiendo al home...',
            () => {
              this.router.navigateByUrl('/home');
            }
          );
        })
        .catch(() => {
          Alert.error(
            'El email ya se encuetra registrado!',
            'Verifique que el email sea el correcto!'
          );
        });
    }
  }
}
