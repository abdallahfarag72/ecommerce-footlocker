import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { db } from '../../../db';
import { adminsEmailsArr } from '../../vars';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard-cmp',
  templateUrl: 'dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  public canvas: any;
  public ctx: any;
  public chartColor: any;
  public chartEmail: any;
  public chartHours: any;
  visits = localStorage.getItem('visits');
  weeklyVisitCounts = JSON.parse(
    localStorage.getItem('weeklyVisitCounts') as any
  );
  itemsInCart = 0;
  allProducts = db.length;

  constructor(private router: Router) {}

  ngOnInit() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const userEmail = loggedInUser ? JSON.parse(loggedInUser).email : '';
    if (!adminsEmailsArr.includes(userEmail)) {
      this.router.navigate(['/home']);
    }
    this.chartColor = '#FFFFFF';
    this.canvas = document.getElementById('chartHours');
    this.ctx = this.canvas.getContext('2d');

    let cartObj = JSON.parse(localStorage.getItem('cart') as any) || {};
    // let cartObj = {
    //   'mazen@gmail.com': [1, 5, 5, 5, 5, 5],
    //   'sergi@gmail.com': [1, 5, 5, 5, 5, 5, 5, 5],
    // };
    console.log(cartObj);

    Object.values(cartObj).forEach((userCart: any) => {
      this.itemsInCart += userCart.length;
    });

    this.chartHours = new Chart(this.ctx, {
      type: 'line',

      data: {
        labels: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thrusday',
          'Friday',
          'Saturday',
        ],
        datasets: [
          {
            borderColor: '#6bd098',
            backgroundColor: '#6bd098',
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 3,
            data: this.weeklyVisitCounts as any,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },

        tooltips: {
          enabled: false,
        },

        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: '#9f9f9f',
                beginAtZero: false,
                maxTicksLimit: 5,
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: '#ccc',
                color: 'rgba(255,255,255,0.05)',
              },
            },
          ],

          xAxes: [
            {
              gridLines: {
                drawBorder: false,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: 'transparent',
                display: false,
              },
              ticks: {
                padding: 20,
                fontColor: '#9f9f9f',
              },
            },
          ],
        },
      },
    });

    this.canvas = document.getElementById('chartEmail');
    this.ctx = this.canvas.getContext('2d');
    this.chartEmail = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: [1, 2, 3],
        datasets: [
          {
            label: 'Emails',
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: ['#e3e3e3', '#4acccd', '#fcc468', '#ef8157'],
            borderWidth: 0,
            data: [342, 480, 530, 120],
          },
        ],
      },

      options: {
        legend: {
          display: false,
        },

        tooltips: {
          enabled: false,
        },

        scales: {
          yAxes: [
            {
              ticks: {
                display: false,
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: 'transparent',
                color: 'rgba(255,255,255,0.05)',
              },
            },
          ],

          xAxes: [
            {
              gridLines: {
                drawBorder: false,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: 'transparent',
              },
              ticks: {
                display: false,
              },
            },
          ],
        },
      },
    });

    var speedCanvas = document.getElementById('speedChart');

    var dataFirst = {
      data: this.weeklyVisitCounts,
      fill: false,
      borderColor: '#fbc658',
      backgroundColor: 'transparent',
      pointBorderColor: '#fbc658',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    };

    var dataSecond = {
      data: [0, 5, 10, 12, 20, 27, 30, 34, 42, 45, 55, 63],
      fill: false,
      borderColor: '#51CACF',
      backgroundColor: 'transparent',
      pointBorderColor: '#51CACF',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    };

    var speedData = {
      labels: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thrusday',
        'Friday',
        'Saturday',
      ],
      datasets: [dataFirst],
    };

    var chartOptions = {
      legend: {
        display: false,
        position: 'top',
      },
    };

    var lineChart = new Chart(speedCanvas as any, {
      type: 'line',
      data: speedData,
      options: chartOptions as any,
    });
  }
}
