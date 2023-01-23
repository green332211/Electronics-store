import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../shared/services/product.service";
import { ProductInterface } from "../../shared/interfaces/product.interface";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { OrderService } from "../../shared/services/order.service";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  public cartProducts: ProductInterface[] = [];
  public totalPrice: number = 0;
  public added: string = '';
  public form: FormGroup;
  public submitted: boolean = false;

  constructor(
    private productServ: ProductService,
    private orderServ: OrderService,
  ) { }

  ngOnInit(): void {
    this.getCartProducts();
    this.getTotalPrice();
    this.initForm();
  }

  private getCartProducts(): void {
    this.cartProducts = this.productServ.cartProducts;
  }

  private getTotalPrice() {
    for (let i = 0; i <this.cartProducts.length; i++) {
      this.totalPrice += +this.cartProducts[i].price;
    }
  }

  private initForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      payment: new FormControl('Cash'),
    })
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const order = {
      name: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address,
      payment: this.form.value.payment,
      orders: this.cartProducts,
      price: this.totalPrice,
      date: new Date(),
    }

    this.orderServ.createOrder(order)
      .subscribe((res) => {
        this.form.reset();
        this.added = 'Delivery is framed';
        this.submitted = false;
      })
  }

  public deleteProduct(product): void {
    this.totalPrice -= +product.price;
    this.cartProducts.splice(this.cartProducts.indexOf(product), 1);
  }
}
