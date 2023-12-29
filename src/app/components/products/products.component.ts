import { Component, OnInit } from '@angular/core';

import { CreateProductDTO, Product } from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail = false;
  productChosen!: Product;

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts()
    .subscribe(data => {
      this.products = data;
    });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(idProduct: number) {
    this.productsService.getProductById(idProduct)
      .subscribe(res => {
        this.toggleProductDetail();
        this.productChosen = res;
      })
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'iPhone 15',
      description: 'Chip A17 Pro con GPU de 6 núcleos · Sistema de cámaras Pro. Nuestra cámara gran angular de 48 MP más avanzada. Cámara teleobjetivo de 3x',
      price: 1039,
      images: [
        'https://mac-center.com.pe/cdn/shop/files/iPhone_15_Pro_Black_Titanium_PDP_Image_Position-1__COES_823x.jpg?v=1695213981',
        'https://tiendasishop.com/media/catalog/product/i/p/iphone15_black_pdp_image_position-1__coes.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700',
        'https://mac-center.com.pe/cdn/shop/files/iPhone_15_Pro_Max_Natural_Titanium_PDP_Image_Position-1__COES_823x.jpg?v=1695213371'
      ],
      categoryId: 2
    }
    this.productsService.create(product).subscribe(data => {
      this.products.unshift(data);
    })
  }

  updateProduct(){
    const change = {
      title: 'IPhone 15 Pro'
    }
    this.productsService.update(this.productChosen.id, change).subscribe(data =>{
      const productIndex = this.products.findIndex(product => product.id === this.productChosen.id);
      this.products[productIndex] = data;
      this.productChosen = data;
    })
  }

}
