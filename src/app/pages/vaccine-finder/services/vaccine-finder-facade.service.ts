import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonDateService } from 'src/app/shared/services/common-date.service';
import { isEmptyData } from 'src/app/shared/utils/common.util';
import { AvailableSlotData } from '../models/available-slot-data';
import { Districts } from '../models/districts.model';
import { States } from '../models/states.model';
import { VaccineStoreState } from '../models/store-state.model';
import { VaccineSlotsDetails } from '../models/vaccine-slots';
import * as VaccineActions from '../store/vaccine/vaccine.actions';
import { selectDistrictsList, selectStatesList, SelecteAvailableVaccineSlots, SelectedDate } from '../store/vaccine/vaccine.selectors';

@Injectable({
  providedIn: 'root'
})
export class VaccineFinderFacadeService {

  constructor(private store: Store<VaccineStoreState>, private dateService: CommonDateService) { }

  /**
   * @description Load State data on page load
   */
  loadListOfStatesData() {
    this.store.dispatch(VaccineActions.loadListOfStates())
  }

  /**
   * @description get list of States data
   * @returns States List
   */
  getListOfStatesData(): Observable<States[]> {
    return this.store.select(selectStatesList).pipe(map((response) => {
      return response?.states
    }));
  }

  /**
   * @description get list of districts data
   * @returns Districts List
   */
  getListOfDistrictsData(): Observable<Districts[]> {
    return this.store.select(selectDistrictsList).pipe((map((response) => {
      return response?.districts
    })))
  }

  /**
   * @description Set Selected State to Store
   * @param state - Type States
   */
  updateSelectedState(state: States) {
    this.store.dispatch(VaccineActions.selectedState({ data: state }))
  }

  /**
   * @description Set Selected Pincode to Store
   * @param pincode - Type number
   */
  updateSelectedPincode(pincode: number) {
    this.store.dispatch(VaccineActions.selectedPincode({ data: pincode }))
  }

  /**
   * @description Set Selected District to Store
   * @param district - Type District
   */
  updateSelectedDistrict(district: Districts) {
    this.store.dispatch(VaccineActions.selectedDistrict({ data: district }))
  }

  /**
   * @description Set Selected Date to Store
   * @param date - Date String
   */
  updateSelectedDate(date: string) {
    this.store.dispatch(VaccineActions.selectedDate({ data: date }))
  }


  getDefaultDate(): string {
    return this.dateService.getDefaultDate();
  }

  getNextSevenDays(format: string, initalDay: number) {
    return this.dateService.getNextSevenDays(format, initalDay);
  }

  fetchAvailableSlots() {
    this.store.dispatch(VaccineActions.loadVaccineSlots());
  }

  fetchAvailableSlotsForPincode() {
    this.store.dispatch(VaccineActions.loadVaccineSlotsByPincode());
  }



  getAvailableSlots(): Observable<AvailableSlotData> {
    return this.store.select(SelecteAvailableVaccineSlots).pipe(map((slots) => {
      const total = this.calculateTotalSlots(slots.sessions);
      const availableSlotsData: AvailableSlotData = {
        totalSlotsAvailable: total || 0,
        slotsDetails: slots?.sessions.map((item) => item).sort((a,b) => (a.availableCapacity > b.availableCapacity) ? -1 : ((b.availableCapacity > a.availableCapacity) ? 1 : 0))
      }
      console.log(availableSlotsData)
      return availableSlotsData;
    }));
  }

  calculateTotalSlots(slots: VaccineSlotsDetails[]) {
    if(isEmptyData(slots)) {
      return;
    }
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return slots.map((item) => item.availableCapacity).reduce(reducer);
  }

  playAudio() {
    const audio = new Audio();
    audio.src = '/assets/audio/alert-notification.wav';
    audio.load();
    audio.play();
  }
}
