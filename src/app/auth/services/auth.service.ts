import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth(): Auth {
    return { ...this._auth! };
  }

  constructor( private http: HttpClient) { }

  verificarAutenticacion(): Observable<boolean> { // Tambien | boolean y no se usario el 'of' del observable
    
    if( !localStorage.getItem('id_usuario') ) {
      return of(false); // sin el | boolean
    }

    return this.http.get<Auth>(`${ this.baseUrl}/usuarios/1`)
            .pipe(
              map( auth => {
                /* console.log('map', auth); */
                this._auth = auth;
                return true;
              })
            );
    /* return of(true);  sin el | boolean */
  }

  login() {
    return this.http.get<Auth>(`${ this.baseUrl}/usuarios/1`)
              .pipe(
                tap( auth => this._auth = auth ),
                tap( auth => localStorage.setItem('id_usuario', auth.id)),
              );
  }

  logout() {
    this._auth = undefined;
  }
}
