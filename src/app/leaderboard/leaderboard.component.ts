import { Component, OnInit } from '@angular/core';
import { HomeService } from '../shared/home.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  leaderboardList = [];

  constructor(private homeService: HomeService) { }

  ngOnInit() {

    this.homeService.getAllUserMatchPoints()
      .subscribe(
        (response: any) => {
          if(response && response.success) {
            this.leaderboardList = response.points;
          }
        }
      );
  }

}
