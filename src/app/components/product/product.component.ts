import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Category, Product } from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product: Product = {
    id: 0,
    price: 0,
    title: '',
    images: [],
    description: '',
  };
  @Output() addedProduct = new EventEmitter<Product>();

  constructor() {}

  onAddToCart() {
    this.addedProduct.emit(this.product);
  }
}
