import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class AuthGuard implements CanActivate {
  user: any;

  constructor(private router: Router, private appService: LoginService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.appService.getUserDeatils();
    console.log(user)
    if(!user){
      this.router.navigate(['']);
    }
    if (this.appService.isLoggedIn()) {
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/home'], { queryParams: { returnUrl: state.url }});
    return false;
  }

  canLoad(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.appService.isLoggedIn()) {

      const user = this.appService.getUserDeatils();
      console.log(user)
      if(!user){
        this.router.navigate(['']);
      }
      // console.log(user)
      //if (route.data.role === user.userRole) {
        // this.router.navigate(['/account']);
      //   return false;
      // }
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/home'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
