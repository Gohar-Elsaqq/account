import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }
}
