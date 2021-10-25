import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getProductsByCategoryId(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>('../../../assets/db/products.json')
      .pipe(map(products => products.filter( product => product.categories === categoryId)
      ));
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('../../../assets/db/products.json');
  }
}
