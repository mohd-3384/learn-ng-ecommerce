import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-auth-nav',
  standalone: true,
  imports: [MenubarModule, RouterLink, RouterLinkActive],
  templateUrl: './auth-nav.component.html',
  styleUrl: './auth-nav.component.scss'
})
export class AuthNavComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Login',
        icon: 'pi pi-sign-in',
        path: 'login'
      },
      {
        label: 'Register',
        icon: 'pi pi-user-plus',
        path: 'register'
      },
    ];
  }
}
