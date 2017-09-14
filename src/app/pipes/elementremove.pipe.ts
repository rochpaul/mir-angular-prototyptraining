import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'elementremove'
})
export class ElementremovePipe implements PipeTransform {

  transform(value: any[], args: string): any[] {
    const index: number = value.indexOf(args);
    if (index !== -1) {
      value.splice(index, 1);
    }

    return value;
  }
}
