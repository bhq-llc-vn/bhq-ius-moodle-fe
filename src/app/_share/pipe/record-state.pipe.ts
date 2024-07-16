import { Pipe, PipeTransform } from '@angular/core';
import { RecordState } from 'src/app/_core/enum/record-state-enum';

@Pipe({
  name: 'recordState'
})
export class RecordStatePipe implements PipeTransform {

  public transformValue(value: any): string { 
    switch (value) {
      case "SUBMITTED":
        return "Đồng bộ thành công";
      case "FAILED":
        return "Đồng bộ thất bại";
      default:
        return "Chưa đồng bộ";
    }
  }

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case "SUBMITTED":
        return "Đồng bộ thành công";
      case "FAILED":
        return "Đồng bộ thất bại";
      default:
        return "Chưa đồng bộ";
    }
  }

}
