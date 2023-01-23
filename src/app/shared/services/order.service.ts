import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { map } from "rxjs";

import { FbResponseInterface } from "../interfaces/fb-response.interface";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  public createOrder(order) {
    return this.http.post(`${environment.fbDbUrl}/orders.json`, order)
      .pipe(map((res: FbResponseInterface) => {
        return{
          ...order,
          id: res.name,
          date: new Date(order.date)
        }
      }))
  }

  public getAllOrder() {
    return this.http.get(`${environment.fbDbUrl}/orders.json`)
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

  public removeOrder(id) {
    return this.http.delete(`${environment.fbDbUrl}/orders/${id}.json`);
  }
}
