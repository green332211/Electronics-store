import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../shared/services/product.service";
import { ActivatedRoute } from "@angular/router";
import { Observable, switchMap } from "rxjs";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  product$: Observable<any>;

  constructor(
    private productServ: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  public getProduct() {
    this.product$ = this.route.params
      .pipe(
        switchMap(params => {
          return this.productServ.getProductById(params['id']);
        })
      )
  }

  public addProduct(product): void {
    this.productServ.addProduct(product);
  }
}
