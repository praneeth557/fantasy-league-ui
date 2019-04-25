import { Component, OnInit } from '@angular/core';
import { HomeService } from '../shared/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  matchList = [];
  matchDetailedView: any = {};
  playersAvailability = [];
  selectedType = '';
  collapseIndex = -1;
  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.homeService.getAllMatches()
      .subscribe(
        (response: any) => {
          if(Array.isArray(response)) {
            for (let i=0; i<response.length; i++) {
              this.matchList.push(this.getHomeObject(response[i]));
            }
          }
          console.log(this.matchList);
        },
        (error) => console.log(error)
      )
  }

  getHomeObject (matchObj) {
    let res = matchObj.matchDate.split("");
    let index = res.indexOf('T');
    if (index > -1) {
      res.splice(index, 1, " ");
    }
    let index2 = res.indexOf('Z');
    if (index2 > -1) {
      res.splice(index2, 1);
    }
    let newDate = res.join("");
    let d = new Date(newDate);
    let n = d.toDateString();
    let splitN = n.split(" ");
    let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let obj = {
      week : weekdays[d.getDay()],
      day : splitN[2],
      month : splitN[1],
      year : splitN[3],
      time : d.toLocaleTimeString(),
      team : matchObj.team,
      opposition : matchObj.opposition,
      battingPoints : 100,
      bowlingPoints : 100,
      fieldingPoints : 100,
      matchPoints : 300,
      status : matchObj.status,
      mid : matchObj.mid
    };

    return obj;
  }

  detailedView(mid, index) {
    this.homeService.getUserMatchDetail(mid)
      .subscribe(
        (response: any) => {
          if(response && response.success) {
            this.matchDetailedView = this.homeService.createDetailedView(response.message, true, mid);
          } else {
            this.matchDetailedView = this.homeService.createDetailedView({}, false, mid);
          }
        },
        (error) => console.log(error)
      )
  }

  viewAvailabilityPlayers(type) {
    console.log(this.matchDetailedView);
    this.homeService.getPlayersAvailability()
      .subscribe(
        (response: any) => {
          if(response && response.success) {
            this.selectedType = type;
            this.playersAvailability = response.message;
          } else {
          }
        },
        (error) => console.log(error)
      )
  }

  selectPlayer(details) {
    for(let i=0; i<this.matchDetailedView.players.length; i++) {
      if(this.matchDetailedView.players[i].type == this.selectedType) {
        this.matchDetailedView.players[i].pid = details.pid;
        this.matchDetailedView.players[i].name = details.name;
        this.matchDetailedView.players[i].role = details.role;
        this.matchDetailedView.players[i].team = details.team;
        this.matchDetailedView.players[i].isExist = true;
      }
    }
    console.log(details);
  }

  trackByFn(index, player) {
    return player.isExist; // or item.id
  }
}
