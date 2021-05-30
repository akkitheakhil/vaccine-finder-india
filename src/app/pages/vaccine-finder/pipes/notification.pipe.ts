import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs/operators';
import { VaccineFinderFacadeService } from '../services/vaccine-finder-facade.service';

@Pipe({
  name: 'notification'
})
export class NotificationPipe implements PipeTransform {

  constructor(private facadeService: VaccineFinderFacadeService) {}
  transform(value: any[]): any[] {
    const filtered = value.filter(item => item?.availableCapacity > 0);
    if(filtered.length > 0) {
      this.facadeService.playAudio();
    }
    return value;
  }

}
