import { Component } from '@angular/core';
import { CategoryService } from '../../core/service/category.service';
import { ActivatedRoute } from '@angular/router';
import { CardComponent } from "../../shared/card/card.component";
import { IProducts } from '../../core/interfaces/http';

@Component({
  selector: 'app-specific-category',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './specific-category.component.html',
  styleUrl: './specific-category.component.scss'
})
export class SpecificCategoryComponent {

  constructor(
    private _categoryService: CategoryService,
    private _activatedRoute: ActivatedRoute
  ) { }

  categoryType: string = '';
  products: IProducts[] = [];

  ngOnInit(): void {
    this.categoryType = this._activatedRoute.snapshot.paramMap.get('type') || '';
    this.getSpecificCategory(this.categoryType);
  }

  getSpecificCategory(type: string): void {
    this._categoryService.getSpecificCategory(type)
      .subscribe((response) => {
        // console.log(response);
        this.products = response.products;
        // console.log(this.products);
      });
  }
}
