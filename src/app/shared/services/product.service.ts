import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { map } from "rxjs";
import { FbResponseInterface } from "../interfaces/fb-response.interface";
import { ProductInterface } from "../interfaces/product.interface";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  type: string = 'Phone';
  cartProducts: ProductInterface[] = [];

  constructor(private http: HttpClient) { }

  public create(product) {
    return this.http.post(`${environment.fbDbUrl}/products.json`, product)
      .pipe(map((res: FbResponseInterface) => {
        return{
          ...product,
          id: res.name,
          date: new Date(product.date)
        }
      }))
  }

  public getAll() {
    return this.http.get(`${environment.fbDbUrl}/products.json`)
      .pipe(
        map(res => {
          return Object.keys(res)
            .map(key => ({
              ...res[key],
              id: key,
              date: new Date(res[key].date)
            }))
        })
      )
  }

  public getProductById(id) {
    return this.http.get(`${environment.fbDbUrl}/products/${id}.json`)
      .pipe(
        map((res: ProductInterface) => {
          return {
              ...res,
              id,
              date: new Date(res.date)
            }
        })
      )
  }

  public removeProduct(id) {
    return this.http.delete(`${environment.fbDbUrl}/products/${id}.json`);
  }

  public updateProduct(product: ProductInterface) {
    return this.http.patch(`${environment.fbDbUrl}/products/${product.id}.json`, product);
  }

  public setType(type): void {
    this.type = type;
  }

  public addProduct(product): void {
    this.cartProducts.push(product);
  }
}
