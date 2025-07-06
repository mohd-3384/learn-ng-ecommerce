import { Component } from '@angular/core';
import { IProducts } from '../../core/interfaces/http';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [DataViewModule, ButtonModule, TagModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  allCartProducts: IProducts[] = [];

  ngOnInit(): void {
    if (localStorage.getItem('cartState')) {
      this.allCartProducts = JSON.parse(
        localStorage.getItem('cartState') || ''
      );
    }
  }

  clearCart(): void {
    localStorage.removeItem('cartState');
    this.allCartProducts = [];
  }
}
