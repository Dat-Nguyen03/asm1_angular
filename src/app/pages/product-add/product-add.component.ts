import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IProduct } from 'src/app/interfaces/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent {
  productForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    price: [0, [Validators.required, Validators.min(10)]],
    img: ['', [Validators.required]],
  });

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private routerNavigate: Router
  ) {}

  onHandleSubmit() {
    const product: IProduct = {
      name: this.productForm.value.name || '',
      price: this.productForm.value.price || 0,
      img: this.productForm.value.img || '',
    };

    this.productService.addProduct(product).subscribe(
      (data) => {
        console.log(data);
        this.routerNavigate.navigate(['/']);
      },
      (err) => console.log(err.message)
    );
  }
}
