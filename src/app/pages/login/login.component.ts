import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../auth/services/users.service';
import { Validacion } from '../../models/validacion';
import { Alert } from '../../models/alert';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  private router: Router = inject(Router);
  private userService: UsersService = inject(UsersService);

  ngOnInit(): void {
    this.userService.sesion(() => {
      this.router.navigateByUrl('/home');
    });
  }

  ngOnDestroy(): void {
    this.userService.desuscribir();
  }

  acceder() {
    if (Validacion.login(this.email, this.password)) {
      this.userService.login(this.email, this.password).catch(() => {
        //Muestro un alert de que no esta registrado
        Alert.error(
          'No se encuentra registrado',
          'Verifique correo y contraseña ingresadas'
        );
      });
    }
  }

  completarLogin() {
    this.email = 'fede@gmail.com';
    this.password = '123456';
  }
}
