import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [NgClass, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  @Input() hasNext: boolean = false;
  @Input() hasPrevious: boolean = false;
  @Input() currentPage: number = 0;
  @Input() maxPages: number = 99;
}
