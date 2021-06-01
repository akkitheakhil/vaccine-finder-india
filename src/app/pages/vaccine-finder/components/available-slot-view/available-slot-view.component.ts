import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { VaccineFinderConstant } from '../../constants/vaccine-finder-constants.model';
import { AvailableSlotData } from '../../models/available-slot-data';
import { CustomSlotFilter } from '../../models/filter.model';
import { VaccineFinderFacadeService } from '../../services/vaccine-finder-facade.service';

@Component({
  selector: 'covac-available-slot-view',
  templateUrl: './available-slot-view.component.html',
  styleUrls: ['./available-slot-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvailableSlotViewComponent implements OnInit {

  private _vaccineFinderConst = new VaccineFinderConstant();

  isNotificationMute$ = this.facadeService.getNotificationSettings();
  Object = Object;
  @Input() availableSlotData!: AvailableSlotData;

  allFiltersAvailable: CustomSlotFilter = this._vaccineFinderConst.CustomFilters;
  appliedFilters: CustomSlotFilter = new CustomSlotFilter();
  shouldNotify: boolean = true;
  $showNotification = new Subject();
  constructor(private facadeService: VaccineFinderFacadeService) { }

  ngOnInit(): void {
    this.showNotification();
  }

  getAgeText(age: number | undefined) {
    return age === 18 ? "18-44" : "45+"
  }


  book() {
    window.open(this._vaccineFinderConst.cowinPortalUrl, "_blank");
  }

  muteNotification(canNotify) {
    const newCanNotify = { isMute: !canNotify.isMute };
    this.facadeService.setNotificationSettings(newCanNotify);
    const message: string = newCanNotify.isMute ? 'Notification muted' : "Notification on";
    this.showSnackBar(message);
  }

  isFilterApplied(key, value) {
    return this.appliedFilters[key].includes(value);
  }


  addorRemoveCustomFilter(key, value) {
    if (this.isFilterApplied(key, value)) {
      this.appliedFilters[key] = this.appliedFilters[key].filter(item => item !== value);
    } else {
      this.appliedFilters[key]?.push(value);
    }
  }

  get filterQuery() {
    let query = {};
    for (let keys in this.appliedFilters) {
      if (this.appliedFilters[keys].constructor === Array && this.appliedFilters[keys].length > 0) {
        query[keys] = this.appliedFilters[keys];
      }
    }
    return query;
  }

  get filterData() {
    const query = this.filterQuery;
    const filteredData = this.availableSlotData?.slotsDetails.filter((item) => {
      for (let key in query) {
        if (item[key] === undefined || !query[key].includes(item[key])) {
          return false;
        }
      }
      return true;
    });
    return filteredData;
  };

  get filteredSlotsData() {
    const dataToFilter = this.filterData.filter(item => item?.availableCapacity > 0);
    const count = this.facadeService.calculateTotalSlots(dataToFilter);
    if (count > 0) {
      this.$showNotification.next(count);
    }
    return dataToFilter;
  }

  showNotification() {
    this.$showNotification.pipe(distinctUntilChanged(), debounceTime(1000), switchMap((data) => {
      this.notify();
      return of();
    })).subscribe();
  }

  clearAllFilters() {
    for (let key in this.appliedFilters) {
      this.appliedFilters[key] = [];
    }
  }

  notify() {
    if (this.shouldNotify) {
      this.facadeService.playNotification();
    }
    this.shouldNotify = false;
    setTimeout(() => {
      this.shouldNotify = true;
    }, 29 * 1000);
  }

  showSnackBar(message: string) {
    this.facadeService.showSnackBar(message);
  }

}
