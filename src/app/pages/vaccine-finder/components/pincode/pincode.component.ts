import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { VaccineFinderConstant } from '../../constants/vaccine-finder-constants.model';
import { VaccineFinderFacadeService } from '../../services/vaccine-finder-facade.service';

@Component({
  selector: 'covac-pincode',
  templateUrl: './pincode.component.html',
  styleUrls: ['./pincode.component.scss']
})
export class PincodeComponent implements OnInit, OnDestroy {

  private _vaccineFinderConst = new VaccineFinderConstant();

  listOfStates$ = this.facadeService.getListOfStatesData();
  listOfDistricts$ = this.facadeService.getListOfDistrictsData();
  listofAvailableSlots$ = this.facadeService.getAvailableSlots();
  selectedDate = this.facadeService.getDefaultDate();
  selectedPincode: number = 0;
  $pincodeSelected = new Subject();
  $OnDestry = new Subject();

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
    this.facadeService.setNewRoute(this._vaccineFinderConst._routes.byPincode)
    this.listenToPincodeChanges();
  }

  newSelectedPincode(): void {
    this.facadeService.updateSelectedPincode(this.selectedPincode);
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

  newPincode() {
    if (this.isValidPincode) {
      this.$pincodeSelected.next(this.selectedPincode);
    }
  }

  get isValidPincode() {
    return this.selectedPincode?.toString()?.length === 6;
  }

  listenToPincodeChanges() {
    this.$pincodeSelected.pipe(debounceTime(400), distinctUntilChanged(), takeUntil(this.$OnDestry)).subscribe((data) => {
      this.facadeService.updateSelectedPincode(this.selectedPincode)
    })
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    this.$OnDestry.next();
    this.$OnDestry.complete();
  }
}
