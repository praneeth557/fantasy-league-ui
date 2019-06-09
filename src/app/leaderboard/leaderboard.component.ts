import { Component, OnInit } from '@angular/core';
import { HomeService } from '../shared/home.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  leaderboardList:any[] = [];
  matchPointsDetails:any[] = [];

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

  togglePointsDetails(val) {
    if(eval('this.' + val)) {
      eval('this.' + val + '=' + false)
    } else {
      eval('this.' + val + '=' + true)
    }

    console.log(eval('this.' + val))
  }

  showPlayersSelection(matchDetails) {
    // matchDetails.points.forEach(point => {
    //   point.pid
    // });
    this.matchPointsDetails = matchDetails;
  }

}
