import { Component, OnInit } from '@angular/core';
import { HomeService } from '../shared/home.service';
import {CookieService} from "ngx-cookie-service";

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
  isSaveMatchPlayersError = false;
  saveMatchPLayersErrorMsg = "";
  isSaveMatchPlayersSuccess = false;
  saveMatchPLayersSuccessMsg = "";
  isStarted:any = 0;

  constructor(private homeService: HomeService,
              private cookieService: CookieService) { }

  ngOnInit(): void {
    this.isStarted = this.cookieService.get('IsStarted');
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
      battingPoints : "N/A",
      bowlingPoints : "N/A",
      fieldingPoints : "N/A",
      matchPoints : "N/A",
      status : matchObj.status,
      mid : matchObj.mid,
      detailedView : {}
    };

    return obj;
  }

  detailedView(mid, index) {
    let matchIndex = -1;
    this.isSaveMatchPlayersError = false;
    this.saveMatchPLayersErrorMsg = "";
    this.isSaveMatchPlayersSuccess = false;
    this.saveMatchPLayersSuccessMsg = "";
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
    return player.name; // or item.id
  }

  saveMatchPlayers(i) {
    this.isSaveMatchPlayersError = false;
    this.saveMatchPLayersErrorMsg = "";
    this.isSaveMatchPlayersSuccess = false;
    this.saveMatchPLayersSuccessMsg = "";
    let saveMatchPlayersReqObj:any = {};
    let detailedViewObj = this.matchList[i].detailedView;
    if(this.matchList[i].status == 0 || this.matchList[i].status == 1) {
      saveMatchPlayersReqObj.mid = detailedViewObj.mid;
      saveMatchPlayersReqObj.uid = detailedViewObj.uid;
      saveMatchPlayersReqObj.oid = detailedViewObj.oid;

      detailedViewObj.players.forEach(player => {
        if(player.pid) {
          switch(player.type) {
            case "CAPTAIN":
              saveMatchPlayersReqObj.captain = player.pid;
              break;
            case "MV BATSMAN":
              saveMatchPlayersReqObj.mvba = player.pid;
              break;
            case "MV BOWLER":
              saveMatchPlayersReqObj.mvbo = player.pid;
              break;
            case "MV FIELDER":
              saveMatchPlayersReqObj.mvar = player.pid;
              break;
            default:
              this.isSaveMatchPlayersError = true;
              this.saveMatchPLayersErrorMsg = player.type + " is not selected.";
              return;
          }
        } else {
          this.isSaveMatchPlayersError = true;
          this.saveMatchPLayersErrorMsg = player.type + " is not selected. Should select all player types.";
          return;
        }
      });

      if(!this.isSaveMatchPlayersError) {
      this.homeService.saveMatchPlayers(saveMatchPlayersReqObj)
        .subscribe(
          (response: any) => {
            if(response && response.success) {
              this.isSaveMatchPlayersSuccess = true;
              this.saveMatchPLayersSuccessMsg = response.message;
            } else {
              this.isSaveMatchPlayersError = true;
              this.saveMatchPLayersErrorMsg = response.message;
            }
          },
          (error) => {
            this.isSaveMatchPlayersError = true;
            this.saveMatchPLayersErrorMsg = "Unable to save at this time.";
          }
        )
      }
    } else {
      this.isSaveMatchPlayersError = true;
      this.saveMatchPLayersErrorMsg = "Match's edit status is either locked or completed."
    }
  }

  getStarted() {
    this.homeService.createAvailability()
      .subscribe(
        (response: any) => {
          if(response && response.success) {
            this.cookieService.set( 'IsStarted', response.isStarted, 1/24 );
            this.isStarted = 1;
          } else {
          }
        },
        (error) => console.log(error)
      )
  }
}
