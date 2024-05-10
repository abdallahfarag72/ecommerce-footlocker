import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { db } from '../../db';
import { MatCardLgImage } from '@angular/material/card';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  itemDetails: any[] = [];
  index: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): any {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) return this.router.navigate(['login']);
    const userEmail = JSON.parse(loggedInUser).email;

    const cartData = localStorage.getItem('cart');
    let cart: Cart = cartData ? JSON.parse(cartData) : {};

    if (!cart.hasOwnProperty(userEmail)) {
      console.log('Your cart is empty');
    } else {
      const userProducts: CartItem[] = cart[userEmail];
      for (let i = 0; i < userProducts.length; i++) {
        //Loop the database to find the item
        for (let j = 0; j < db.length; j++) {
          if (userProducts[i].item_id == db[j].id) {
            //Loop the variants
            for (let m = 0; m < db[j].variants.length; m++) {
              if (db[j].variants[m].id == userProducts[i].variant_id) {
                this.itemDetails.push({
                  title: db[j].title,
                  type: db[j].type,
                  variantID: db[j].variants[m].id,
                  style: db[j].variants[m].style,
                  img: db[j].variants[m].img,
                  salePrice: db[j].variants[m].salePrice,
                  quantity: userProducts[i].item_quantity,
                });
                break;
              }
            }
          }
        }
      }
    }
  }

  continueShopping() {
    this.router.navigate(['/home']);
  }

  removeItem(param: any) {
    for (let i = 0; i < this.itemDetails.length; i++) {
      if (param === this.itemDetails[i].variantID) {
        // Remove item from itemDetails array
        this.itemDetails.splice(i, 1);

        // Update local storage
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
          const userEmail = JSON.parse(loggedInUser).email;
          const cartData = localStorage.getItem('cart');
          if (cartData) {
            let cart: Cart = JSON.parse(cartData);
            if (cart.hasOwnProperty(userEmail)) {
              const userProducts: CartItem[] = cart[userEmail];
              const updatedCart = userProducts.filter(
                (item) => item.variant_id !== param
              );
              cart[userEmail] = updatedCart;
              localStorage.setItem('cart', JSON.stringify(cart));
            }
          }
        }

        break;
      }
    }
  }

  checkout() {
    const user = localStorage.getItem('loggedInUser');
    if (!user) return alert('No user');
    const { email } = JSON.parse(user);
    window.open(
      `https://buy.stripe.com/test_fZedTZ88A2rwdEcfZe?prefilled_email=${email}`
    );
  }
}

interface CartItem {
  item_id: string;
  variant_id: string;
  item_quantity: number;
}

interface Cart {
  [userEmail: string]: CartItem[];
}
