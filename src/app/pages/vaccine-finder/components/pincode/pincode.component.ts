import { Component, OnInit, ViewChild } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { VaccineFinderConstant } from '../../constants/vaccine-finder-constants.model';
import { VaccineFinderFacadeService } from '../../services/vaccine-finder-facade.service';

@Component({
  selector: 'covac-pincode',
  templateUrl: './pincode.component.html',
  styleUrls: ['./pincode.component.scss']
})
export class PincodeComponent implements OnInit {

  private _vaccineFinderConst = new VaccineFinderConstant();

  listOfStates$ = this.facadeService.getListOfStatesData();
  listOfDistricts$ = this.facadeService.getListOfDistrictsData();
  listofAvailableSlots$ = this.facadeService.getAvailableSlots();

  selectedDate = this.facadeService.getDefaultDate();

  selectedPincode: number = 0;

  $pincodeSelected = new Subject();

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

  constructor(private facadeService: VaccineFinderFacadeService) { }


  ngOnInit(): void {
    this.facadeService.loadListOfStatesData();
    this.calender = [...this.facadeService.getNextSevenDays("DD-MM-YYYY", this.initalDay)];
    this. listenToPincodeChanges();
  }

  newSelectedPincode(): void {
    this.facadeService.updateSelectedPincode(this.selectedPincode);
  }

  newSelectedDate(date: string): void {
    this.selectedDate = date;
    this.countdown.restart();
    this.facadeService.updateSelectedDate(this.selectedDate);
  }

  getSlots(): void {
    this.hasSeached = true;
    this.facadeService.fetchAvailableSlotsForPincode();
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.countdown.restart();
      this.facadeService.fetchAvailableSlotsForPincode();
    }, 30 * 1000);
  }

  nextCalenderDays() {
    this.initalDay += 7;
    this.calender = [...this.facadeService.getNextSevenDays("DD-MM-YYYY", this.initalDay)];
  }

  prevCalenderDays() {
    this.initalDay -= 7;
    this.calender = [...this.facadeService.getNextSevenDays("DD-MM-YYYY", this.initalDay)];
  }

  newPincode() {
    if(this.isValidPincode) {
      this.$pincodeSelected.next(this.selectedPincode);
    }
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

  get isValidPincode() {
    return this.selectedPincode?.toString()?.length === 6;
  }

  listenToPincodeChanges() {
    this.$pincodeSelected.pipe(debounceTime(400),distinctUntilChanged()).subscribe((data) => {
      this.facadeService.updateSelectedPincode(this.selectedPincode)
    })
  }
}
