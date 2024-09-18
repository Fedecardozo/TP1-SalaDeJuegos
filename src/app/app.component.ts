import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { UsersService } from './auth/services/users.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ButtonModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  ocultarbtnLogin: boolean = true;
  ocultarbtnRegistro: boolean = true;
  ocultarbtnLogout: boolean = true;

  private userService: UsersService = inject(UsersService);

  ngOnInit(): void {
    this.userService.sesion(
      () => {
        this.hiddenBtns(true);
      },
      () => {
        this.hiddenBtns(false);
      }
    );
  }

  hiddenBtns(estado: boolean) {
    this.ocultarbtnRegistro = estado;
    this.ocultarbtnLogin = estado;
    this.ocultarbtnLogout = !estado;
  }
  cerraSesion() {
    this.userService.cerrarSesion();
    this.hiddenBtns(false);
  }
}
