import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../core/service/cart.service';
import { IProducts } from '../../core/interfaces/http';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

  constructor(
    private _activateRoute: ActivatedRoute,
    private _cartService: CartService
  ) { }

  id: string = '';
  productDetails!: IProducts;
  isAddedToCart: boolean = false;

  ngOnInit(): void {
    this._activateRoute.paramMap.subscribe(
      (next: any) => (this.id = next.params['id'])
    );
    this.displayDetails();
  }

  displayDetails(): void {
    this._activateRoute.data.subscribe((data: any) => {
      this.productDetails = {
        ...data.details.product,
        isAddedToCart: this._cartService.isAddedToCart(data.details.product),
      };
    });
  }

  addToCart(product: IProducts) {
    this._cartService.addToCart(product);
  }

}
