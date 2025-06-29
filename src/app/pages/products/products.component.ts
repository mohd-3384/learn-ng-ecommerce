import { Component } from '@angular/core';
import { ProductsService } from '../../core/service/products.service';
import { CartService } from '../../core/service/cart.service';
import { IProducts } from '../../core/interfaces/http';
import { CardComponent } from '../../shared/card/card.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SearchNamePipe } from '../../core/pipes/search-name.pipe';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent, InputIconModule, IconFieldModule, InputTextModule, FormsModule, SearchNamePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  constructor(
    private _productsService: ProductsService,
    private _cart: CartService
  ) { }

  allProducts: IProducts[] = [];
  searchKey: string = '';


  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this._productsService.allProducts().subscribe((response: any) => {
      this.allProducts = response.products.map((product: IProducts) => {
        return {
          ...product,
          isAddedToCart: this._cart.isAddedToCart(product) || false,
        };
      });
    });
  }
}
