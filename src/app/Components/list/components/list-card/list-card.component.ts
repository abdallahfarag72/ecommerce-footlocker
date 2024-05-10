import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { IListCard } from '../../../../../types';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './list-card.component.html',
  styleUrl: './list-card.component.css',
})
export class ListCardComponent {
  @Input() cardData = {} as IListCard;
  activeVariant = 0;
  handleImageClick(e: MouseEvent, index: number) {
    e.preventDefault();
    e.stopPropagation();
    this.activeVariant = index;
  }
}
