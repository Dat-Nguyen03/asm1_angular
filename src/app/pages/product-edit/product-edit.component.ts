import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { IProduct } from 'src/app/interfaces/product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent {
  product!: IProduct;
  productForm = this.formBuilder.group({
    name: ['', Validators.required],
    price: [0, Validators.required],
    img: ['', [Validators.required]],
  });
  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private routerNavigate: Router
  ) {
    this.router.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      console.log(id);

      this.productService.getProduct(id).subscribe((data) => {
        this.product = data;

        this.productForm.patchValue({
          name: data.name,
          price: data.price,
          img: data.img,
        });
      });
    });
  }

  onHandleSubmit() {
    const product: IProduct = {
      id: this.product.id,
      name: this.productForm.value.name || '',
      price: this.productForm.value.price || 0,
      img: this.productForm.value.img || '',
    };
    this.productService.editProduct(product).subscribe(
      (data) => {
        console.log(data);
        this.routerNavigate.navigate(['/']);
      },
      (err) => console.log(err.message)
    );
  }
}
