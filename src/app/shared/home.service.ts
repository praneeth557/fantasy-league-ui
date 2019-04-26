import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConstants } from '../constants/app.constants';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient,
              private appConstants: AppConstants,
              private authorizationService: AuthorizationService) { }

  getAllMatches() {
    let headers = this.authorizationService.getHeadersObject();
    let url = this.appConstants.APP_URL + this.appConstants.GET_ALL_MATCHES_URL;

    return this.http.get(url, {headers: headers});
  }

  getUserMatchDetail(mid) {
    let headers = this.authorizationService.getHeadersObject();
    let url = this.appConstants.APP_URL + this.appConstants.GET_USER_MATCH_DETAIL_URL;
    let reqObj = {
      mid : mid,
      uid : parseInt(this.authorizationService.getUID())
    };

    return this.http.post(url, reqObj, {headers: headers});
  }

  createDetailedView(detailedObj, isExist, mid) {
    if(!isExist) {
      let obj = {
        oid:0,
        uid:parseInt(this.authorizationService.getUID()),
        mid:mid,
        isExist : isExist,
        players : [
          {
            type : "CAPTAIN",
            isExist : false
          },
          {
            type : "MV BATSMAN",
            isExist : false
          },
          {
            type : "MV BOWLER",
            isExist : false
          },
          {
            type : "MV FIELDER",
            isExist : false
          }
        ]
      };

      return obj;
    } else {
      for(let i=0; i<detailedObj.players.length; i++) {
        detailedObj.players[i].isExist = true;
      }

      detailedObj.isExist = isExist;

      return detailedObj;
    }

  }

  getPlayersAvailability() {
    let headers = this.authorizationService.getHeadersObject();
    let url = this.appConstants.APP_URL + this.appConstants.GET_PLAYERS_AVAILABILITY_URL;
    let reqObj = {
      uid : parseInt(this.authorizationService.getUID())
    };

    return this.http.post(url, reqObj, {headers: headers});
  }

  saveMatchPlayers(saveObj) {
    let headers = this.authorizationService.getHeadersObject();
    let url = this.appConstants.APP_URL + this.appConstants.SAVE_MATCH_PLAYERS_URL;

    return this.http.post(url, saveObj, {headers: headers});
  }
}
