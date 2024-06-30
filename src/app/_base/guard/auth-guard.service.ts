import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subscription, debounceTime, firstValueFrom, from, map, of, take, tap, timer } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  private $unSub: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router, private activateRoute: ActivatedRoute, private authenticationService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.isAuthenticated().pipe(map(authenticated => {
      return authenticated;
    }), tap((value: any) => {
      if(!value) {
        this.router.navigate(['auth/login']);
      }
    }));
  }
}
