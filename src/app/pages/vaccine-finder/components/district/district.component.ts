import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';
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
export class DistrictComponent implements OnInit {

  private _vaccineFinderConst = new VaccineFinderConstant();

  listOfStates$ = this.facadeService.getListOfStatesData();
  listOfDistricts$ = this.facadeService.getListOfDistrictsData();
  listofAvailableSlots$ = this.facadeService.getAvailableSlots();

  selectedState: States = { stateId: -1, stateName: "" };
  selectedDistrict: Districts = { districtId: -0, districtName: "" };
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

  constructor(private facadeService: VaccineFinderFacadeService) { }

  ngOnInit(): void {
    this.facadeService.loadListOfStatesData();
    this.calender = [...this.facadeService.getNextSevenDays("DD-MM-YYYY", this.initalDay)];
  }

  newSelectedState(): void {
    this.facadeService.updateSelectedState(this.selectedState);
  }

  newSelectedDistrict(): void {
    this.facadeService.updateSelectedDistrict(this.selectedDistrict);
  }

  newSelectedDate(date: string): void {
    this.selectedDate = date;
    this.countdown.restart();
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
    this.initalDay += 7;
    this.calender = [...this.facadeService.getNextSevenDays("DD-MM-YYYY", this.initalDay)];
  }

  prevCalenderDays() {
    this.initalDay -= 7;
    this.calender = [...this.facadeService.getNextSevenDays("DD-MM-YYYY", this.initalDay)];
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



}
