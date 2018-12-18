import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FetcherService } from '../fetcher.service';

@Injectable()
export class CanActivateDashboard implements CanActivate {
  constructor(
    private $router: Router,
    private $fetcher: FetcherService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    if (!this.$fetcher.token) {
      this.$router.navigate(['/login']);
    }
    return of(!!this.$fetcher.token);
  }
}
