import { Component, OnInit } from '@angular/core';
import { HomeService } from '../shared/home.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})

// export interface Points {
//   role? : string,
//   battingPts : number,
//   bowlingPts : number,
//   fieldingPts : number,
//   mid? : number,
//   otherPts? : number,
//   pid? : number,
//   ptid? : number,
//   totalPts : number,
//   name? : string
// }
//
// export interface MatchPointsDetails {
//   matchDate : string,
//   mid : number,
//   opposition : string,
//   status : number,
//   points : Points[],
//   totalPoints : Points
// }

export class LeaderboardComponent implements OnInit {

  leaderboardList:any[] = [];
  matchPointsDetails = {points:[], totalPoints:{battingsPts:0, bowlingPts:0, fieldingPts:0, totalPts:0}};

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

  }

  showPlayersSelection(matchDetails) {
    // matchDetails.points.forEach(point => {
    //   point.pid
    // });
    this.matchPointsDetails = matchDetails;
  }

}
