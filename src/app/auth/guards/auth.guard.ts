import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( 
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      
    /* if( this.authService.auth.id ) {
      return true;
    }

    console.log( 'Bloqueado por el AuthGuard - CanActivate')
    return false; */

    return this.authService.verificarAutenticacion()
            .pipe(
              tap( estaAutenticado => { // Lo que recibe el observable
                if( !estaAutenticado ) {
                  this.router.navigate(['./auth/login']);
                }
              })
            );
  }

  canLoad( // Sirve para prevenir la carga de la ruta del modulo en el que es usado
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      /* console.log( 'canLoad', false );
      console.log( route );
      console.log( segments ); */

      /* if( this.authService.auth.id ) {
        return true;
      }

      console.log( 'Bloqueado por el AuthGuard - CanLoad')
      return false; */

      return this.authService.verificarAutenticacion()
              .pipe(
                tap( estaAutenticado => {
                  if( !estaAutenticado ) {
                    this.router.navigate(['./auth/login']);
                  }
                })
              );

  }
}
