
import { Pipe, PipeTransform } from '@angular/core';
import { isEmptyData } from '../common.util';

@Pipe({
  name: 'dataFilter',
  pure: false
})
export class DataFilterPipe implements PipeTransform {

  transform(value: any[] | any, filters: any[ ] = []): any[] {
    if (isEmptyData(value) || isEmptyData(filters)) {
      return value;
    }
    let result: any[] = [];

    result = value.filter(item => filters.every(f => f(item)));

    // this.notificationService.playAudio();
    return result;

  }



}
