import { importExpr } from '@angular/compiler/src/output/output_ast';
import { ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CountdownComponent } from 'ngx-countdown';
import { combineLatest, forkJoin, merge, Subject } from 'rxjs';
import { isEmpty, takeUntil } from 'rxjs/operators';
import { isEmptyData } from 'src/app/shared/utils/common.util';
import { VaccineFinderConstant } from '../../constants/vaccine-finder-constants.model';
import { Districts } from '../../models/districts.model';
import { States } from '../../models/states.model';
import { VaccineSlotsDetails } from '../../models/vaccine-slots';
import { VaccineFinderFacadeService } from '../../services/vaccine-finder-facade.service';


@Component({
  selector: 'covac-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss']
})
export class DistrictComponent implements OnInit, OnDestroy {

  private _vaccineFinderConst = new VaccineFinderConstant();

  listOfStates$ = this.facadeService.getListOfStatesData();
  listOfDistricts$ = this.facadeService.getListOfDistrictsData();
  listofAvailableSlots$ = this.facadeService.getAvailableSlots();

  selectedDistricFormControl = new FormControl();

  $onDestroy = new Subject();
  selectedState: States = { stateId: -1, stateName: "" };
  selectedDistrict: Districts = {districtId: 296, districtName: "Thiruvananthapuram"}
  selectedDate = this.facadeService.getDefaultDate();
  filters: { name: any, label: string }[] = this._vaccineFinderConst.filters;
  customFilters = this._vaccineFinderConst.CustomFilters;
  selectedFilters: any[] = [];

  countDownConfig = {
    leftTime: 30,
    format: 'ss'
  }

  hasSeached: boolean = false;

  calender: string[] = [];
  initalDay = 1;
  interval;

  @ViewChild('cd', { static: false })
  private countdown!: CountdownComponent;

  constructor(private facadeService: VaccineFinderFacadeService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.facadeService.loadListOfStatesData();
    this.calender = [...this.facadeService.getNextCalenderDates("DD-MM-YYYY", this.initalDay, 4)];
    this.listenToPreviousChoice();
  }

  newSelectedState(data): void {
    this.hasSeached = false;
    this.facadeService.updateSelectedState(this.selectedState);
  }

  newSelectedDistrict(): void {
    this.hasSeached = false;
    this.facadeService.updateSelectedDistrict(this.selectedDistrict);
  }

  newSelectedDate(date: string): void {
    this.selectedDate = date;
    this.countdown?.restart();
    this.facadeService.updateSelectedDate(this.selectedDate);
  }

  getSlots(): void {
    this.hasSeached = true;
    this.facadeService.fetchAvailableSlots();
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.countdown.restart();
      this.facadeService.fetchAvailableSlots();
    }, 30 * 1000);
  }

  nextCalenderDays() {
    this.initalDay += 4;
    this.calender = [...this.facadeService.getNextCalenderDates("DD-MM-YYYY", this.initalDay, 4)];
  }

  prevCalenderDays() {
    this.initalDay -= 4;
    this.calender = [...this.facadeService.getNextCalenderDates("DD-MM-YYYY", this.initalDay, 4)];
  }


  getAgeText(age: number | undefined) {
    return age === 18 ? "18-44" : "45+"
  }

  addFilter(filterName) {
    const filter = this.customFilters[filterName];
    this.selectedFilters.push(this.customFilters[filterName])
  }

  removeFilter(filterName) {
    const filter = this.customFilters[filterName];
    this.selectedFilters = this.selectedFilters.filter(item => item !== filter);
  }

  filterAction(filterName) {
    this.isFilterApplied(filterName) ? this.removeFilter(filterName) : this.addFilter(filterName);
  }

  isFilterApplied(filterName) {
    const filter = this.customFilters[filterName];
    return this.selectedFilters.includes(filter)
  }

  book() {
    window.open(this._vaccineFinderConst.cowinPortalUrl, "_blank");
  }

  listenToPreviousChoice() {
    this.facadeService.getFindByDistrictInit().pipe(takeUntil(this.$onDestroy)).subscribe((data) => {

      if (isEmptyData(data)) {
        return
      }
      this.selectedState = isEmptyData(data[0]) ? this.selectedState : data[0];
      this.selectedDistrict = isEmptyData(data[1]) ? this.selectedDistrict : data[1];
      this.selectedDate = isEmptyData(data[2]) ? this.selectedDate : data[2];
      this.selectedDistricFormControl.setValue(this.selectedDistrict)

      console.log(this.selectedDistricFormControl.value)
      this.cdr.detectChanges();
      this.cdr.markForCheck();
    })
  }


  selectedDistrictToDisplay(disctrict1, disctrict2){
    if (disctrict1.districtId == disctrict2.districtId) {
      return true;
    } else {
      return false;
    }
  }

  selectedStateToDisplay(state1, state2){
    if (state1.stateId == state2.stateId) {
      return true;
    } else {
      return false;
    }
  }



  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    this.$onDestroy.next();
    this.$onDestroy.complete();
  }
}
