import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recordState'
})
export class RecordStatePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
