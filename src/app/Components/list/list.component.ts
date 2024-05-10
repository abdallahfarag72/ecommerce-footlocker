import { Component, OnInit, Output } from '@angular/core';
import { ListCardComponent } from './components/list-card/list-card.component';
import { db } from '../../../db';
import { NavComponent } from './components/nav/nav.component';
import { ActivatedRoute, Params } from '@angular/router';
import { IListCard } from '../../../types';
import { Subscription, filter } from 'rxjs';
import { AsideComponent } from './components/aside/aside.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ListCardComponent, NavComponent, AsideComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  currentPage = 0;
  pageCount = 32;
  cards = [] as IListCard[];
  hasPrevious = false;
  hasNext = false;
  maxPages = Math.floor(db.length / this.pageCount);
  paramsFilter = {} as {
    price_from?: string;
    price_to?: string;
    type?: string[];
    gender?: string[];
    title?: string;
  };

  queryParamsSubscription: Subscription | null = null;

  constructor(private route: ActivatedRoute) {
    const queryParams = this.route.snapshot.queryParams;
    if (queryParams) this.handleParams(queryParams);
  }

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        this.handleParams(params);
      }
    );
  }

  handleParams(params: Params) {
    if ('p' in params) this.currentPage = +params['p'];
    this.paramsFilter = {};
    Object.keys(params).forEach((key) => {
      if (key != 'p') {
        //@ts-ignore
        this.paramsFilter[key] = params[key];
      }
    });
    this.updateCards();
  }

  updateCards() {
    let { title, gender, type: typeFilter } = this.paramsFilter;
    if (typeFilter && typeof typeFilter == 'string')
      this.paramsFilter.type = typeFilter = [typeFilter];
    if (gender && typeof gender == 'string')
      this.paramsFilter.gender = gender = [gender];

    const localDb = db.reduce((acc, item) => {
      const copy = structuredClone(item);
      if (typeFilter && !typeFilter?.includes(copy.type)) return acc;
      if (gender && !gender.includes(copy.gender.toLowerCase())) return acc;
      if (title && !item.title.toLowerCase().includes(title.toLowerCase()))
        return acc;
      copy.variants = copy.variants.filter((v) => {
        if (
          'price_from' in this.paramsFilter &&
          v.salePrice < +(this.paramsFilter.price_from as string)
        )
          return false;
        if (
          'price_to' in this.paramsFilter &&
          v.salePrice > +(this.paramsFilter.price_to as string)
        )
          return false;

        return true;
      });
      if (copy.variants.length == 0) return acc;
      return [...acc, copy];
    }, [] as IListCard[]);

    this.maxPages = Math.floor(localDb.length / this.pageCount);
    this.hasPrevious = this.currentPage > 0;
    // +1 because we already start with 1 page
    const start = this.currentPage * this.pageCount;
    const end = start + this.pageCount;
    this.cards = localDb.slice(start, end);
    this.hasNext = localDb.length > end;
    window.scrollTo({ behavior: 'smooth', top: 0 });
  }
}
