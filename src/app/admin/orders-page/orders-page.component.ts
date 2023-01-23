import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { OrderService } from "../../shared/services/order.service";

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit, OnDestroy {
  public orders = [];
  public orderSubscription: Subscription;
  public removeOrderSubscription: Subscription;

  constructor(
    private orderServ: OrderService,
  ) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  public getAllOrders() {
    this.orderSubscription = this.orderServ.getAllOrder()
      .subscribe(
        (orders) => {
          this.orders = orders;
        }
      )
  }

  ngOnDestroy(): void {
    if (this.orderSubscription) {
      this.orderSubscription.unsubscribe()
    }

    if (this.removeOrderSubscription) {
      this.removeOrderSubscription.unsubscribe()
    }
  }

  public removeOrder(id) {
    this.removeOrderSubscription = this.orderServ.removeOrder(id)
      .subscribe(
        () => {
          this.orders = this.orders.filter((order) => order.id !== id);
        }
      )
  }
}
