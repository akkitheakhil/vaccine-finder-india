import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isEmptyData } from 'src/app/shared/utils/common.util';
import { Districts } from '../../models/districts.model';
import { States } from '../../models/states.model';
import { VaccineFinderFacadeService } from '../../services/vaccine-finder-facade.service';


@Component({
  selector: 'covac-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss']
})
export class DistrictComponent implements OnInit, OnDestroy {

  listOfStates$ = this.facadeService.getListOfStatesData();
  listOfDistricts$ = this.facadeService.getListOfDistrictsData();
  listofAvailableSlots$ = this.facadeService.getAvailableSlots();

  $onDestroy = new Subject();
  selectedState: States = { stateId: -1, stateName: "" };
  selectedDistrict: Districts = { districtId: 296, districtName: "Thiruvananthapuram" }
  selectedDate = this.facadeService.getDefaultDate();

  countDownConfig = {
    leftTime: 30,
    format: 'ss'
  }

  hasSeached: boolean = false;
  interval;

  @ViewChild('cd', { static: false })
  public countdown!: CountdownComponent;

  constructor(private facadeService: VaccineFinderFacadeService) { }

  ngOnInit(): void {
    this.facadeService.loadListOfStatesData();
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

  getSlots(): void {
    this.hasSeached = true;
    this.facadeService.fetchAvailableSlots();
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.countdown.restart();
      this.facadeService.fetchAvailableSlots();
    }, 30 * 1000);
  }

  listenToPreviousChoice() {
    this.facadeService.getFindByDistrictInit().pipe(takeUntil(this.$onDestroy)).subscribe((data) => {

      if (isEmptyData(data)) {
        return
      }
      this.selectedState = isEmptyData(data[0]) ? this.selectedState : data[0];
      this.selectedDistrict = isEmptyData(data[1]) ? this.selectedDistrict : data[1];
      this.selectedDate = isEmptyData(data[2]) ? this.selectedDate : data[2];
    })
  }

  selectedDistrictToDisplay(disctrict1, disctrict2) {
    if (disctrict1.districtId == disctrict2.districtId) {
      return true;
    } else {
      return false;
    }
  }

  selectedStateToDisplay(state1, state2) {
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
