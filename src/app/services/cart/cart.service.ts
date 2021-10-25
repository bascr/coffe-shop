import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from 'src/app/models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSource: BehaviorSubject<Cart>;
  cart: Observable<Cart>;

  constructor() { 
    this.cartSource = new BehaviorSubject<Cart>({productList: [], total: 0});
    this.cart = this.cartSource.asObservable();
  }

  updateCart(cart: Cart): void {
    this.cartSource.next(cart);
  }

 
}
