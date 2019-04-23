import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { PointsSystemComponent } from './points-system/points-system.component';

const routes: Routes = [
  { path : 'home', component: HomeComponent },
  { path : 'leaderboard', component: LeaderboardComponent },
  { path : 'pointsSystem', component: PointsSystemComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
