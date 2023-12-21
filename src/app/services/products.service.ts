import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from './../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl = 'https://api.escuelajs.co/api/v1/products';

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getProductById(idProduct: number) {
    return this.http.get<Product>(`${this.baseUrl}/${idProduct}`)
  }
}
