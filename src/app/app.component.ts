import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { VisitsService } from './services/visits.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'ng-project';
  visits = 0;
  weeklyVisitCounts: number[] = [];

  constructor(private visitCounterService: VisitsService) {}

  ngOnInit(): void {
    this.visits = this.visitCounterService.getVisitCount();
    this.visitCounterService.incrementVisitCount();

    this.visitCounterService.updateVisitCountForToday();
    this.weeklyVisitCounts = this.visitCounterService.getWeeklyVisitCounts();
  }
}
