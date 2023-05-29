import { Component } from '@angular/core';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  products: IProduct[] = [];
  constructor(private productService: ProductService) {
    this.productService.getAllProduct().subscribe(
      (data) => {
        this.products = data;
      },
      (err) => console.log(err.message)
    );
  }
  handleDelete(id: number | string) {
    const isConfirm = confirm('Do you want to delete this product?');
    if (isConfirm) {
      this.productService.deleteProduct(id).subscribe(
        () => {
          this.products = this.products.filter((item) => item.id !== id);
          console.log('Deleted');
        },
        (err) => console.log(err.message)
      );
    }
  }
}
