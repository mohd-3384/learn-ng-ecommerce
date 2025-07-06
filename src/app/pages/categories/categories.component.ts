import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../core/service/category.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

  constructor(
    private _categoryService: CategoryService
  ) { }

  allCategories: string[] = [];

  ngOnInit() {
    this.displayAllCategories();
  }

  displayAllCategories(): void {
    this._categoryService.getAllCategories()
      .subscribe((categories) => {
        this.allCategories = categories.categories;
        // console.log(categories.categories)
      });
  }

  getImageCategory(type: string): string {
    return `./assets/categories/${type}.jpg`;
  }
}
