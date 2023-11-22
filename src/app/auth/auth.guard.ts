import { CanActivateFn, CanActivateChildFn } from "@angular/router";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { inject, Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { map, take } from "rxjs";

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user.pipe(
    take(1),
      map(user => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        return router.createUrlTree(['/auth']);
      }))
};

export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => AuthGuard(route, state);

//Isn't broke, don't understand how works.
