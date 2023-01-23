import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from "../../shared/services/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product;

  constructor(
    private productServ: ProductService,
  ) { }

  ngOnInit(): void {
  }


  public addProduct(product): void {
    this.productServ.addProduct(product);
  }
}
