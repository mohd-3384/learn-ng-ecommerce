import { Component } from '@angular/core';
import { IProducts } from '../../core/interfaces/http';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  allCartProducts: IProducts[] = [];

  ngOnInit(): void {
    if (localStorage.getItem('cartState') !== null) {
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
