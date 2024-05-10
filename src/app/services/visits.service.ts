import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VisitsService {
  constructor() {}

  getVisitCount(): number {
    const prevVisits = localStorage.getItem('visits');
    return prevVisits ? parseInt(prevVisits, 10) : 0;
  }

  incrementVisitCount(): void {
    const prevVisits = this.getVisitCount();
    const newVisits = prevVisits + 1;
    localStorage.setItem('visits', newVisits.toString());
  }

  getWeeklyVisitCounts(): number[] {
    let weeklyVisitCounts = JSON.parse(
      localStorage.getItem('weeklyVisitCounts') as any
    );

    if (!weeklyVisitCounts) {
      weeklyVisitCounts = [0, 0, 0, 0, 0, 0, 0];
    }

    return weeklyVisitCounts;
  }

  updateVisitCountForToday(): void {
    const dayOfWeek = new Date().getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
    const weeklyVisitCounts = this.getWeeklyVisitCounts();
    weeklyVisitCounts[dayOfWeek] += 1;
    localStorage.setItem(
      'weeklyVisitCounts',
      JSON.stringify(weeklyVisitCounts)
    );
  }
}
