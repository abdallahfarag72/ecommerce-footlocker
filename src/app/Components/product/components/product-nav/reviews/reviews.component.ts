import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {
  constructor(private  router: Router) {}

  textareaValue: string = ''; //value inside the textarea
  nameLogged: string = '';
  numberOfStars: number = 5; //total number of stars in general
  starRating: number = 0; //the user rating
  starIcons: string[] = []; //adding paths of the star svgs

  reviews = [] as {
    comment: string,
    userName: string,
    starIcons: string[],
    starRating: number
  }[];

  setStarNumber(star: number) {
    this.starRating = star;
  }

  addReview() {
    if (!localStorage.getItem("loggedInUser"))
      this.router.navigate(['login']);
    const newReview: any = JSON.parse(localStorage.getItem("loggedInUser") || "");
    this.nameLogged = newReview.name;

    for (let i = 1; i <= this.numberOfStars; i++) {
      if (i <= this.starRating) {
        this.starIcons.push("assets/starFilled.svg")
      } else {
        this.starIcons.push("assets/starNotFilled.svg");
      }
    }

    this.reviews.push({
      comment: this.textareaValue,
      starIcons: this.starIcons,
      starRating: this.starRating,
      userName: this.nameLogged
    })
    this.starIcons = [];
    this.nameLogged = "";
    this.textareaValue = "";
  }

}
