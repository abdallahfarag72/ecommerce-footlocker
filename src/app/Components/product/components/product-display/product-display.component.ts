import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { db } from '../../../../../db';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-display',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-display.component.html',
  styleUrl: './product-display.component.css',
})
export class ProductDisplayComponent implements OnInit {
  @Input() itemID: string = '';
  @Input() variantID: string = '';
  activeButton: number | null = null;
  selectedOption: string = '0';
  productColors = [] as string[];
  itemAdded: string = '';
  quantity: number = 1;

  //the displayed item and its data
  item = {} as {
    title: string;
    id: string;
    gender: string;
    type: string;
    style: string;
    img: string;
    salePrice: number;
    item_variant: string;
    variants: any[];
  };

  //sizes of the product
  sizes: number[] = [
    6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14,
    14.5, 15,
  ];

  sizesEU: number[] = [
    38.5, 39, 40, 40.5, 41, 42, 42.5, 43, 44, 44.5, 45, 45.5, 46, 47, 47.5,
    48.5, 49.5,
  ];

  //to change the sleected option variable accordingly to show which sizes appear
  onSelectChange(event: any) {
    this.selectedOption = event.target.value;
  }

  // Method to set active button
  setActiveButton(buttonNumber: number) {
    this.activeButton = buttonNumber;
  }

  //function to display the current selected item
  itemToDisplay(param: any) {
    //take the parameter passed in the function and this will be the index number in the varients array
    //then use this index to loop in the db.ts and change the item object.
    this.item.img = this.item.variants[param].img;
    this.item.salePrice = this.item.variants[param].salePrice;
    this.item.item_variant = this.item.variants[param].id;
    this.itemAdded = '';
    this.item.style = this.item.variants[param].style;
  }

  //function to add to cart
  addToCart() {
    // Get the current cart from localStorage or create a new one if it doesn't exist
    let cart: Cart = JSON.parse(localStorage.getItem('cart') || '{}');

    let userLogged: any = JSON.parse(
      localStorage.getItem('loggedInUser') || ''
    );

    let userEmail: any = userLogged.email;

    if (!userEmail) alert('Please Log in first.');

    // Add the (current displayed) item to the cart
    const newItem: CartItem = {
      item_id: this.item.id,
      variant_id: this.item.item_variant,
      item_quantity: this.quantity,
    };

    // If the user's email is not in the cart, initialize it with an empty array
    if (!cart[userEmail]) {
      cart[userEmail] = [];
    }

    //check if item is already in cart or not
    for (let i = 0; i < cart[userEmail].length; i++) {
      if (
        newItem.item_id === cart[userEmail][i].item_id &&
        newItem.variant_id === cart[userEmail][i].variant_id
      ) {
        this.itemAdded = 'Item Updated.';
        cart[userEmail][i] = newItem;
        localStorage.setItem('cart', JSON.stringify(cart));
        return;
      }
    }
    cart[userEmail].push(newItem);

    // Store the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    this.itemAdded = 'Item added Successfully';
  }

  ngOnInit(): void {
    //getting data from the url, then looping to assign the values to the item object to display it in the html
    for (let i = 0; i < db.length; i++) {
      if (this.itemID === db[i].id) {
        this.item.title = db[i].title;
        this.item.id = db[i].id;
        this.item.gender = db[i].gender;
        this.item.type = db[i].type;
        this.item.variants = [];
        for (let j = 0; j < db[i].variants.length; j++) {
          this.item.variants.push(db[i].variants[j]);
          if (this.variantID === db[i].variants[j].id) {
            this.item.style = db[i].variants[j].style;
            this.item.img = db[i].variants[j].img;
            this.item.salePrice = db[i].variants[j].salePrice;
            this.item.item_variant = db[i].variants[j].id;
          }
        }
        break;
      }
    }
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
