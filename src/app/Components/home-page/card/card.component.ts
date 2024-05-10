import { Component, Input } from '@angular/core';
import { item } from '../image-slide-sale/image-slide-sale.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
@Input() items = [] as item[][]
@Input() id=""
}
