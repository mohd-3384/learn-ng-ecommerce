import { Component, OnInit } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { CardComponent } from "../../shared/card/card.component";
import { IProducts } from '../../core/interfaces/http';
import { PopularPipe } from '../../core/pipes/popular.pipe';
import { ProductsService } from '../../core/service/products.service';
import { CartService } from '../../core/service/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GalleriaModule, CardComponent, PopularPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  images: any[] | undefined;
  smallProducts!: IProducts[];
  popularProducts!: IProducts[];
  responsiveOptions: any[] | undefined;

  constructor(
    private _productsService: ProductsService,
    private _cart: CartService
  ) { }

  ngOnInit() {
    this.getAllProducts();
    this.images = [
      {
        itemImageSrc: './assets/images/product-1.jpg',
        alt: 'Description for Product 1',
        title: 'Product 1'
      },
      {
        itemImageSrc: './assets/images/product-2.jpg',
        alt: 'Description for Product 2',
        title: 'Product 2'
      },
      {
        itemImageSrc: './assets/images/product-3.jpg',
        alt: 'Description for Product 3',
        title: 'Product 3'
      },
      {
        itemImageSrc: './assets/images/product-4.jpg',
        alt: 'Description for Product 4',
        title: 'Product 4'
      },
    ]
  }

  getAllProducts(): void {
    this._productsService.allProducts().subscribe((response: any) => {
      this.smallProducts = response.products.slice(0, 4);
      this.popularProducts = response.products.map((product: IProducts) => {
        return {
          ...product,
          isAddedToCart: this._cart.isAddedToCart(product) || false,
        };
      });
    });
  }

}
