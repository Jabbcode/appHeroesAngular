import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor( 
    private router: Router,
    private authService: AuthService
  ) { }

  login() {

    // Ir al Backend
    // un usuario
    this.authService.login()
      .subscribe( resp => {
        console.log( resp );

        if( resp.id ) {
          this.router.navigate(['./heroes']);
        }
      })

  }
  
  ingrarSinLogin() { 
    //Esto es solo para demostras el funcionamiento del CanLoad del Guard el que 
    //solo restringue cargar el modulo.
    this.authService.logout();
    this.router.navigate(['./heroes']);
  }
  

}
