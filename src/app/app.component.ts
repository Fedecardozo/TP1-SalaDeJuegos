import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
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
  constructor(protected userService: UsersService) {}
  router: Router = inject(Router);
  ngOnInit(): void {}

  cerraSesion() {
    this.userService.cerrarSesion();
    this.router.navigateByUrl('home');
  }
}
