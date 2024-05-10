import { Component, OnInit, Output } from '@angular/core';
import { db } from '../../../../db';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CardComponent } from '../card/card.component';

export type item = typeof db[number]

@Component({
  selector: 'app-image-slide-sale',
  standalone: true,
  imports: [RouterOutlet, CommonModule,RouterLink,CardComponent],
  templateUrl: './image-slide-sale.component.html',
  styleUrls: ['./image-slide-sale.component.css'],
})
export class ImageSlideSaleComponent implements OnInit {
   saleItemsBig = [] as item[][];
  normalItemsBig = [] as item[][];

  saleItemsSmall = [] as item[][];
  normalItemsSmall = [] as item[][];

  ngOnInit() {
    this.dbArrayBig();
    this.dbArraySmall();
  }

  dbArrayBig() {
    const saleChunk = [] as item[];
    const normalChunk = [] as item[];

    db.forEach((item) => {
      item.variants.forEach((variant, index) => {
        const itemData = {
          variants:[variant],
          title: item.title,
          id: item.id,
          type: item.type,

        } as item;
        if (variant.isSale) {
          if (saleChunk.length === 4) {
            this.saleItemsBig.push(saleChunk.slice());
            saleChunk.length = 0;
          }
          saleChunk.push(itemData);
        } else {
          if (normalChunk.length === 4) {
            this.normalItemsBig.push(normalChunk.slice());
            normalChunk.length = 0;
          }
          normalChunk.push(itemData);
        }
      });
    });

    if (saleChunk.length > 0) {
      this.saleItemsBig.push(saleChunk.slice());
    }

    if (normalChunk.length > 0) {
      this.normalItemsBig.push(normalChunk.slice());
    }
  }

  dbArraySmall() {
    const saleChunk: any[] = [];
    const normalChunk: any[] = [];

    db.forEach((item) => {
      item.variants.forEach((variant, index) => {
        const itemData = {
          variants:[variant],
          title: item.title,
          id: item.id,
          type: item.type,

        } as item;

        if (variant.isSale) {
          if (saleChunk.length === 1) {
            this.saleItemsSmall.push(saleChunk.slice());
            saleChunk.length = 0;
          }
          saleChunk.push(itemData);
        } else {
          if (normalChunk.length === 1) {
            this.normalItemsSmall.push(normalChunk.slice());
            normalChunk.length = 0;
          }
          normalChunk.push(itemData);
        }
      });
    });

    if (saleChunk.length > 0) {
      this.saleItemsSmall.push(saleChunk.slice());
    }

    if (normalChunk.length > 0) {
      this.saleItemsSmall.push(normalChunk.slice());
    }
  }
}
