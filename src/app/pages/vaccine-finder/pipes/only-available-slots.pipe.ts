import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onlyAvailableSlots'
})
export class OnlyAvailableSlotsPipe implements PipeTransform {

  transform(value: any[]): any[] {
    const filtered = value.filter(item => item?.availableCapacity > 0);
    return filtered;
  }

}
