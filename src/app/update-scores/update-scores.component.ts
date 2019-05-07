import {Component, OnInit, Input, OnChanges} from '@angular/core';
import { Batting, Bowling, Fielding } from '../shared/points.service'
import { HomeService } from '../shared/home.service'

@Component({
  selector: 'app-update-scores',
  templateUrl: './update-scores.component.html',
  styleUrls: ['./update-scores.component.css']
})
export class UpdateScoresComponent implements OnInit, OnChanges {

  @Input() matchList: any;
  @Input() players: any;

  selectedMatch: any;
  updateView:number = 1;
  isSaveScoreError:boolean = false;
  saveScoreError:string;

  constructor(private homeService: HomeService) { }

  ngOnInit() {}

  ngOnChanges() {
    if(this.players && this.players.length) {
      this.players.forEach((player: any) => {
        player.batting = new Batting(player.pid);
        player.bowling = new Bowling(player.pid);
        player.fielding = new Fielding(player.pid);
      });
    }
  }

  saveScoreNext(present, next, isNext) {
    if(next) this.updateView = next;
  }

  saveScore(selectedMatch) {
    if(selectedMatch.value != '-1') {
      let saveScoreResObj = {
        mid : parseInt(selectedMatch.value),
        batting : [],
        bowling : [],
        fielding : []
      };

      this.players.forEach(player => {
        saveScoreResObj.batting.push(player.batting);
        saveScoreResObj.bowling.push(player.bowling);
        saveScoreResObj.fielding.push(player.fielding);
      });

      this.homeService.savePlayersScores(saveScoreResObj)
        .subscribe(
          (response) => {
            console.log(response)
          },
          (error) => console.log(error)
        )
    } else {
      this.isSaveScoreError = true;
      this.saveScoreError = "Invalid match";
    }
  }

  changeMatchStatus(id, name, mid) {
    let obj = {
      id : id,
      name : name.name,
      value : parseInt(name.value),
      mid : parseInt(mid.value)
    };
    this.homeService.setMatchStatus(obj)
      .subscribe(
        (response) => {
          console.log(response)
        },
        (error) => console.log(error)
      )
  }

}
