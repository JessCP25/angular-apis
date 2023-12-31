import { Component, OnInit } from '@angular/core';

import { CreateProductDTO, Product } from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail = false;
  productChosen!: Product;
  limit = 10;
  offset = 0;

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productsService.getAllProducts(10, 0).subscribe((data) => {
      this.products = data;
      this.offset += this.limit;
    });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(idProduct: number) {
    this.productsService.getProductById(idProduct).subscribe({
      next: (res) => {
        this.toggleProductDetail();
        this.productChosen = res;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  readAndUpdate(idProduct: number) {
    this.productsService.getProductById(idProduct)
    .pipe(
      switchMap((product)=> this.productsService.update(product.id, {title: 'change'}))
    )
    .subscribe(data => {
      console.log(data)
    });
    this.productsService.fetchReandAndUpdate(idProduct, {title: 'nuevo'})
    .subscribe(response => {
      const read = response[0];
      const update = response[1]
    })
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'iPhone 15',
      description:
        'Chip A17 Pro con GPU de 6 núcleos · Sistema de cámaras Pro. Nuestra cámara gran angular de 48 MP más avanzada. Cámara teleobjetivo de 3x',
      price: 1039,
      images: [
        'https://mac-center.com.pe/cdn/shop/files/iPhone_15_Pro_Black_Titanium_PDP_Image_Position-1__COES_823x.jpg?v=1695213981',
        'https://tiendasishop.com/media/catalog/product/i/p/iphone15_black_pdp_image_position-1__coes.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700',
        'https://mac-center.com.pe/cdn/shop/files/iPhone_15_Pro_Max_Natural_Titanium_PDP_Image_Position-1__COES_823x.jpg?v=1695213371',
      ],
      categoryId: 2,
    };
    this.productsService.create(product).subscribe((data) => {
      this.products.unshift(data);
    });
  }

  updateProduct() {
    const change = {
      title: 'IPhone 15 Pro',
    };
    this.productsService
      .update(this.productChosen.id, change)
      .subscribe((data) => {
        const productIndex = this.products.findIndex(
          (product) => product.id === this.productChosen.id
        );
        this.products[productIndex] = data;
        this.productChosen = data;
      });
  }

  deleteProduct() {
    this.productsService.delete(this.productChosen.id).subscribe(() => {
      const productIndex = this.products.findIndex(
        (product) => product.id === this.productChosen.id
      );
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }

  loadMore() {
    this.productsService
      .getAllProducts(this.limit, this.offset)
      .subscribe((data) => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
      });
  }
}
