import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interfaces';

@Pipe({
  name: 'imagen',
  /* pure: false */
})
export class ImagenPipe implements PipeTransform {

  transform( heroeImagen: Heroe ): string {

    if( !heroeImagen.id && !heroeImagen.alt_img ) {
      return 'assets/no-image.png';
    } else if( heroeImagen.alt_img ) {
      return heroeImagen.alt_img;
    } else {
      return `assets/heroes/${ heroeImagen.id }.jpg`;
    }

  }

}
