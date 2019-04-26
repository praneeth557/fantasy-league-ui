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
  playersAPIAvailability = [];
  playersAvailability = [];
  selectedType = '';
  selectedMatchIndex = -1;
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
    //let d = new Date(newDate);
    let d = new Date(newDate.replace(/-/g, "/"));
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
      mid : matchObj.mid,
      detailedView : {}
    };

    return obj;
  }

  detailedView(mid, index) {
    let matchIndex = -1;
    this.matchList.forEach((match, index) => {
      if(match.mid == mid) {
        matchIndex = index;
      }
    });
    console.log(matchIndex);
    this.homeService.getUserMatchDetail(mid)
      .subscribe(
        (response: any) => {
          if(response && response.success) {
            if(matchIndex > -1) {
              this.matchList[matchIndex].detailedView = this.homeService.createDetailedView(response.message, true, mid);
            }
          } else {
            this.matchList[matchIndex].detailedView = this.homeService.createDetailedView({}, false, mid);
          }
        },
        (error) => console.log(error)
      )
  }

  viewAvailabilityPlayers(type, index) {
    this.homeService.getPlayersAvailability()
      .subscribe(
        (response: any) => {
          if(response && response.success) {
            this.selectedType = type;
            this.selectedMatchIndex = index;
            this.playersAvailability = response.message;
          } else {
          }
        },
        (error) => console.log(error)
      )
  }

  selectPlayer(details) {
    for(let i=0; i<this.matchList[this.selectedMatchIndex].detailedView.players.length; i++) {
      if(this.matchList[this.selectedMatchIndex].detailedView.players[i].type == this.selectedType) {
        this.matchList[this.selectedMatchIndex].detailedView.players[i].pid = details.pid;
        this.matchList[this.selectedMatchIndex].detailedView.players[i].name = details.name;
        this.matchList[this.selectedMatchIndex].detailedView.players[i].role = details.role;
        this.matchList[this.selectedMatchIndex].detailedView.players[i].team = details.team;
        this.matchList[this.selectedMatchIndex].detailedView.players[i].isExist = true;
      }
    }
  }

  trackByFn(index, player) {
    return player.isExist; // or item.id
  }
}
