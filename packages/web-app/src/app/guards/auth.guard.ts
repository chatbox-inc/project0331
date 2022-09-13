import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { AuthAction } from '@store/auth/auth.action';
import { AuthStateModel } from '@store/auth/auth.interface';
import { AuthState } from '@store/auth/auth.state';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  @Select(AuthState) auth$: Observable<AuthStateModel>;

  constructor(private readonly router: Router, private readonly store: Store) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.auth$.pipe(
      take(1),
      switchMap((auth) => {
        console.log(auth);
        if (!auth.token) {
          return throwError(() => {
            new Error('not authn');
          });
        }
        return this.store.dispatch(new AuthAction.login(auth.token));
      }),
      map(() => {
        return true;
      }),
      catchError(() => {
        return of(this.router.parseUrl(`/login?redirect_to=${state.url}`));
      }),
    );
  }
}
