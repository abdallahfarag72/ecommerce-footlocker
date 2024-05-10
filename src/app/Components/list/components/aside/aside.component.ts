import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { db } from '../../../../../db';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [MatExpansionModule, RouterModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css',
})
export class AsideComponent implements OnInit {
  // get types from the entire db
  filterTypes = db.reduce((acc: string[], item) => {
    if (!acc.includes(item.type)) acc = [...acc, item.type];
    return acc;
  }, []);
  queryParamsSubscription: Subscription | null = null;
  paramsFilter = {
    type: [],
    price_from: 0,
    price_to: 0,
    gender: [],
  } as {
    type: string[];
    price_from: number;
    price_to: number;
    gender: string[];
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (qparams: Params) => {
        this.paramsFilter = {
          type: [],
          price_from: 0,
          price_to: 0,
          gender: [],
        };
        Object.keys(qparams).forEach((key) => {
          if (key == 'gender' && !Array.isArray(qparams[key]))
            this.paramsFilter[key] = [qparams[key]];
          //@ts-ignore
          else this.paramsFilter[key] = qparams[key];
        });
      }
    );
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const obj = {} as any;
    Object.keys(this.paramsFilter).forEach((key) => {
      let data: any = '';
      //@ts-ignore
      if (['gender', 'type'].includes(key)) {
        data = formData.getAll(key);
        if (data.length > 0) obj[key] = data;
      } else {
        data = formData.get(key);
        if (data) obj[key] = data;
      }
    });
    this.router.navigate(['/list'], {
      queryParams: obj,
    });
  }
}
