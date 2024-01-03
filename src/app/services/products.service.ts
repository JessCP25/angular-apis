import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CreateProductDTO, Product } from './../models/product.model';

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

  create(dto: CreateProductDTO) {
    return this.http.post<Product>(this.baseUrl, dto);
  }

  update(idProduct: number, dto: any) {
    return this.http.put<Product>(`${this.baseUrl}/${idProduct}`, dto);
  }

  delete(idProduct: number){
    return this.http.delete<boolean>(`${this.baseUrl}/${idProduct}`);
  }
}
