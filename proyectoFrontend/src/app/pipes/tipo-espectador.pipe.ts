import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoEspectador',
  standalone: true
})
export class TipoEspectadorPipe implements PipeTransform {

  transform(valor: string): string {
    if(valor === 'l') {
      return 'Local';
    }
    return 'Extranjero';
  }
}
