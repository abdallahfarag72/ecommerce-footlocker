import { Component, OnInit  } from '@angular/core';
import { ProductDisplayComponent } from './components/product-display/product-display.component';
import { RecetlyViewedComponent } from './components/recetly-viewed/recetly-viewed.component';
import { ProductNavComponent } from './components/product-nav/product-nav.component';
import { db } from '../../../db';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    ProductDisplayComponent,
    RecetlyViewedComponent,
    ProductNavComponent,
    FormsModule,
    CommonModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  itemID: string = "";
  variantID: string = "";

  ngOnInit(): void {
    window.scroll(0, 0);
    this.route.params.subscribe(params => {
      this.itemID = params['itemID']; // Extracting 'STYLE_263256' from the URL

      this.variantID = params['variantID']; // Extracting '316479204204' from the URL

    });
  }

}
