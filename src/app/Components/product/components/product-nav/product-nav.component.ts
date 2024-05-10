import { Component } from '@angular/core';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ReviewsComponent } from './reviews/reviews.component';


@Component({
  selector: 'app-product-nav',
  standalone: true,
  imports: [
    ProductDetailsComponent,
    ReviewsComponent
  ],
  templateUrl: './product-nav.component.html',
  styleUrl: './product-nav.component.css'
})
export class ProductNavComponent {
  displayDataContent: number = 0;

  displayData(key:number) {
    this.displayDataContent = key;
  }
}
