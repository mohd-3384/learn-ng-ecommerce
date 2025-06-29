import { Pipe, PipeTransform } from '@angular/core';
import { IProducts } from '../interfaces/http';

@Pipe({
  name: 'searchName',
  standalone: true
})
export class SearchNamePipe implements PipeTransform {

  transform(products: IProducts[], searchKey: string): IProducts[] {
    return products?.filter((product: IProducts) => {
      return product.title.toLowerCase().includes(searchKey.toLowerCase());
    })
  }
}
