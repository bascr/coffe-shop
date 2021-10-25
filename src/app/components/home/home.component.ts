import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category/category.service';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product/product.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { Cart, Item } from 'src/app/models/cart.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  categories: Category[];
  products: Product[];
  cart: Cart;

  constructor(private categoryService: CategoryService, 
    private productService: ProductService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getCart();
  }
  
  getCategories(): void {
    this.categoryService.getCategories().subscribe( data => {
      this.categories = data;
    });
  }

  getProductsByCategoryId(categoryId: number): void {
    this.productService.getProductsByCategoryId(categoryId).subscribe( data => {
      this.products = data;
    });
  }

  onGetProductList(id: number): void {
    this.getProductsByCategoryId(id);
  }

  getCart(): void {
    this.cartService.cart.subscribe((cart: Cart) => {
      this.cart = cart;
    });
  }

  updateCart(): void {
    this.cartService.updateCart(this.cart);
    this.getCart();
  }

  findProductInCart(product: Product): Item {
    return this.cart.productList.find((item: Item) => item.product.id === product.id);
  }

  onAddToCart(product: Product): void {
    let found: Item = this.findProductInCart(product);
    if(found) {
      this.cart.productList = this.cart.productList.map((item: Item) => {
        if(item.product.id === product.id) {
          item.quantity++;
        }
        return item
      });
    } else {
      this.cart.productList.push({ 
        product: product,
        quantity: 1 
      });
    } 
    this.updateCart();
  }

}
