import { Pipe, PipeTransform } from '@angular/core';
import { VaccineFinderFacadeService } from '../services/vaccine-finder-facade.service';

@Pipe({
  name: 'filteredSlotCount'
})
export class FilteredSlotCountPipe implements PipeTransform {

  transform(value: any[]): number | undefined {
    return this.facadeService.calculateTotalSlots(value);
  }

  constructor(private facadeService: VaccineFinderFacadeService) {

  }

}
