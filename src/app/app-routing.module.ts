import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { PointsSystemComponent } from './points-system/points-system.component';
import {AuthGuardService} from "./shared/auth-guard.service";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  { path : 'login', component: LoginComponent },
  { path : 'home', canActivate: [AuthGuardService], component: HomeComponent },
  { path : 'leaderboard', canActivate: [AuthGuardService], component: LeaderboardComponent },
  { path : 'pointsSystem', canActivate: [AuthGuardService], component: PointsSystemComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
