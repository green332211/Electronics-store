import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from "../../../shared/services/product.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy{
  products = [];
  productSubscription: Subscription;
  removeProductSubscription: Subscription;
  productName;

  constructor(
    private productServ: ProductService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts() {
    this.productSubscription = this.productServ.getAll()
      .subscribe(
        (products) => {
          console.log(products);
          this.products = products;
        }
      )
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe()
    }

    if (this.removeProductSubscription) {
      this.removeProductSubscription.unsubscribe()
    }
  }

  public removeProduct(id) {
    this.removeProductSubscription = this.productServ.removeProduct(id)
      .subscribe(
        () => {
          this.products = this.products.filter((product) => product.id !== id);
        }
      )
  }
}
