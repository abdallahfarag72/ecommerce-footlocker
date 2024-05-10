import { Component } from '@angular/core';
import { Slide } from '../../../types';
import { db } from '../../../db';
import { ImageSlideSaleComponent } from './image-slide-sale/image-slide-sale.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  imports:[ImageSlideSaleComponent,RouterLink]
})
export class HomePageComponent {
  
}
