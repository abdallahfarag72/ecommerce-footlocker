import { Routes } from '@angular/router';
import { ListComponent } from './Components/list/list.component';
import { LoginComponent } from './Components/login/login.component';
import { BrowseComponent } from './Components/browse/browse.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { ProductComponent } from './Components/product/product.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { CartComponent } from './cart/cart.component';
import { HeaderComponent } from './Components/header/header.component';

export const routes: Routes = [
  {
    path: 'list',
    component: ListComponent,
  },
  {
    path: 'list?gender=men',
    component: ListComponent,
  },
  {
    path: 'list?gender=women',
    component: ListComponent,
  },
  {
    path: 'list?gender=kid',
    component: ListComponent,
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'browse',
    component: BrowseComponent,
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'product/:itemID/:variantID',
    component: ProductComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  // {
  //   path: 'home',
  //   component: CartComponent,
  // },
];
