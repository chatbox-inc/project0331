import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of, throwError} from 'rxjs';
import {Select, Store} from "@ngxs/store";
import {AuthState, AuthStateModel} from "../store/auth/auth.state";
import {catchError, distinct, map, switchMap, take} from "rxjs/operators";
import {AuthAction} from "../store/auth/auth.action";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  @Select(AuthState) auth$: Observable<AuthStateModel>

  constructor(
    private router: Router,
    private store:Store
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth$.pipe(
      take(1),
      switchMap(r => {
        console.log(r)
        if(r.token){
          return this.store.dispatch(new AuthAction.login(r.token))
        }else{
          return throwError(()=>{
            new Error("not authen")
          })
        }
      }),
      map(()=>{
        return true
      }),
      catchError(()=>{
        return of(this.router.parseUrl(`/login?redirect_to=${state.url}`))
      })
    )
  }

}
