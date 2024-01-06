import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { CreateProductDTO, Product } from './../models/product.model';
import { retry } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl = `${environment.API_URL}/api/v1/products`;

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if( limit && offset){
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this.baseUrl, {params})
    .pipe(
      retry(3)
    );
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
