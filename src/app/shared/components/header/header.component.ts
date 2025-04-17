import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  private authService = inject(AuthService);

  get gt() {
    return this.authService.gt;
  }

  get turno() {
    return localStorage.getItem('turno');
  }


  ngOnInit(): void {
    console.log(this.gt)
    console.log(this.turno)
  }
}
