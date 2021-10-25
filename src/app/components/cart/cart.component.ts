import { Component, OnInit } from '@angular/core';
import { Cart, Item } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart/cart.service';
import { ComboService } from 'src/app/services/combo/combo.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Combo, ProductSummary } from 'src/app/models/combo.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {

  cart: Cart;
  combos: Combo[];
  combosToApply: Combo[];

  constructor(private cartService: CartService, 
    private comboService: ComboService,
    private router: Router) { }

  ngOnInit(): void {
    this.getCart();
  }

  checkDiscounts(): void {
    this.combosToApply = [];
    this.combos.map((combo: Combo) => {
      let count = 0;
      combo.products.map((productSummary: ProductSummary) => {
        this.cart.productList.map((item: Item) => {
          if(productSummary.id === item.product.id) {
            count += item.quantity;
            if(count > 0 && count % combo.products.length === 0) {
              this.combosToApply.push(combo);
            }
          }
        }); 
      }); 
    });
  }

  applyDiscount() {
    let discount = 0;
    if(this.combosToApply !== undefined) {
      this.combosToApply.map((combo: Combo) => {
        let comboTotal = 0;
        combo.products.map((productSummary: ProductSummary) => {
          let item = this.cart.productList.find((item: Item) => item.product.id === productSummary.id);
          comboTotal += item.product.price;
        });
        discount += comboTotal * combo.discount;
      });
    }
    console.log(discount)
    this.cart.total = this.cart.total - discount;
  }

  getTotal(cart: Cart): void {
    let total:number = 0;
    cart.productList.map((item: Item) => {
      total += (item.product.price + (item.product.price * (item.product.tax / 100))) * item.quantity;
    });
    cart.total = total;
  }

  getCart(): void {
    this.cartService.cart.subscribe((cart: Cart) => {
      this.getTotal(cart);
      this.cart = cart;
      this.getCombos();
    });
  }

  cleanCart(): void {
    this.cartService.updateCart({ productList: [], total: 0 });
    this.getCart();
  }

  getCombos(): void {
    this.comboService.getCombos().subscribe((combos: Combo[]) => {
      this.combos = combos;
      this.checkDiscounts();
      this.applyDiscount();
    });
  }

  payBill(): void {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your order will be ready soon',
      showConfirmButton: false,
      timer: 1500
    });
    this.cleanCart();
    this.router.navigate(['home']);
  }

  cancel(): void {
    this.cleanCart();
    this.router.navigate(['home']);
  }

}