import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../shared/services/product.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  products$: Observable<Array<any>>;

  constructor(
    public productServ: ProductService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  private getAllProducts(): void {
    this.products$ = this.productServ.getAll();
  }

}
