import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';

import { CreateProductDTO, Product, UpdateProductDTO } from './../models/product.model';
import { catchError, map, retry, throwError, zip } from 'rxjs';
import { environment } from './../../environments/environment';
import { checkTime } from '../interceptors/time.interceptor';

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
    return this.http.get<Product[]>(this.baseUrl, {params, context: checkTime()})
    .pipe(
      retry(3),
      map(products => products.map(item=>{
        return {
          ...item,
          taxes: .19 * item.price
        }
      }))
    );
  }

  getProductById(idProduct: number) {
    return this.http.get<Product>(`${this.baseUrl}/${idProduct}`)
    .pipe(
      catchError((error: HttpErrorResponse)=>{
        if(error.status === HttpStatusCode.Conflict){
          return throwError(()=> new Error('Algo esta fallando en el servidor.'))
        }
        if(error.status === HttpStatusCode.NotFound){
          return throwError(()=> new Error('El producto no existe'));
        }
        if(error.status === HttpStatusCode.Unauthorized){
          return throwError(()=> new Error('No estas permitido'))
        }
        return throwError(()=> new Error('Ups algo salio mal'))
      })
    )
  }
  fetchReandAndUpdate(idProduct: number, dto: UpdateProductDTO ) {
    return zip(
      this.getProductById(idProduct),
      this.update(idProduct, dto)
    )
  }

  create(dto: CreateProductDTO) {
    return this.http.post<Product>(this.baseUrl, dto);
  }

  update(idProduct: number, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.baseUrl}/${idProduct}`, dto);
  }

  delete(idProduct: number){
    return this.http.delete<boolean>(`${this.baseUrl}/${idProduct}`);
  }
}
