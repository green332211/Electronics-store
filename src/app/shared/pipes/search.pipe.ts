import { Pipe, PipeTransform } from '@angular/core';
import { ProductInterface } from "../interfaces/product.interface";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: ProductInterface[], productName: string = '') {
    if (!productName.trim()) {
      return products;
    }

    return products.filter((product) => {
      return product.title.toLowerCase().includes(productName.toLowerCase());
    });
  }

}
