import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { VaccineFinderHttpService } from '../../services/vaccine-finder-http.service';
import * as VaccineActions from './vaccine.actions';
import { map, mergeMap, catchError, switchMap, distinctUntilChanged, withLatestFrom, filter, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as camelCaseRecursive from 'camelcase-keys-recursive';
import { VaccineStoreState } from '../../models/store-state.model';
import { Action, select, Store } from '@ngrx/store';
import { SelectedState, SelectedDistrict, SelectedDate, SelectedPincode } from './vaccine.selectors';
import { States } from '../../models/states.model';
import { isEmptyData } from 'src/app/shared/utils/common.util';
import { Districts } from '../../models/districts.model';
import { CommonDateService } from 'src/app/shared/services/common-date.service';

@Injectable()
export class VaccineEffects {

  private _selectedState$ = this.store.select(SelectedState);
  private _selectedDistrict$ = this.store.select(SelectedDistrict);
  private _selectedDate$ = this.store.select(SelectedDate);
  private _selectedPincode$ = this.store.select(SelectedPincode);

  //#region Load List of States Effect
  /**
   * @description Effect for loading states list from API based on action Load States
   */
  loadStates$ = createEffect((): any => this.actions$.pipe(
    ofType(VaccineActions.loadListOfStates),
    switchMap(() => {
      return this.httpService.getAllStateCode().pipe(
        map(data => {
          // to convert response from snake_case to camelCase
          const res = camelCaseRecursive(data);
          return VaccineActions.loadListOfStatesSuccess({ data: res });
        }
        ),
        catchError(error => of(VaccineActions.loadListOfStatesFailure({ error })))
      );
    })
  ));
  //#endregion

  //#region Load List of Districts Effect
  /**
   * @description Effect for loading Districts list from API based on action Load Districts
   */
  loadDistricts$ = createEffect((): any => this.actions$.pipe(
    ofType(VaccineActions.loadListOfDistricts),
    withLatestFrom(this._selectedState$),
    switchMap((payload: [Action, States]) => {
      return this.httpService.getAllDistricts(payload[1]?.stateId).pipe(
        map(data => {
          // to convert response from snake_case to camelCase
          const res = camelCaseRecursive(data);
          return VaccineActions.loadListOfDistrictsSuccess({ data: res });
        }
        ),
        catchError(error => of(VaccineActions.loadListOfDistrictsFailure({ error })))
      );
    })
  ));
  //#endregion

  //#region LOad District On State Change
  /**
   * Loads district data when new state is selected
   */
  loadDistrictOnStateSelections$ = createEffect((): any => this.store.pipe(
    select(SelectedState),
    filter((state) => !isEmptyData(state?.stateName)),
    mergeMap(() => [
      VaccineActions.loadListOfDistricts(),
      VaccineActions.LoadDefaultDate()
    ]),
    distinctUntilChanged()
  ));

  //#endregion

  //#region Load Date default date on Pincode Selection
  /**
   * Loads default date when pincode is selected.
   */
  loadDateOnPincodeSelection$ = createEffect((): any => this.store.pipe(
    select(SelectedPincode),
    filter((pincode) => !isEmptyData(pincode) && pincode?.toString().length === 6),
    mergeMap(() => [
      VaccineActions.LoadDefaultDate()
    ]),
    distinctUntilChanged()
  ));

  //#endregion

  //#region Loads Available Slot District
  /**
   * Loads available slot for a district on date change
   */
  loadAvailableSlotsOnDateChange$ = createEffect((): any => this.store.pipe(
    select(SelectedDate),
    withLatestFrom(this._selectedDistrict$),
    filter((data: [string, Districts]) => {
      return !isEmptyData(data[1]?.districtName) && !isEmptyData(data[0]);
    }),
    mergeMap(() => [
      VaccineActions.loadVaccineSlots(),
    ]),
    distinctUntilChanged()
  ));

  //#endregion

  //#region Load Available Slot Pincode
  /**
   * Loads available slot for a pincode when new pincode is selected
   */
  loadAvailableSlotPincodeOnDateChange$ = createEffect((): any => this.store.pipe(
    select(SelectedDate),
    withLatestFrom(this._selectedPincode$),
    filter((data: [string, number]) => {
      return (!isEmptyData(data[1]) && data[1] > 0 && data[1].toString().length === 6) && !isEmptyData(data[0]);
    }),
    mergeMap(() => [
      VaccineActions.loadVaccineSlotsByPincode(),
    ]),
    distinctUntilChanged()
  ));

  //#endregion

  //#region Load Vaccine Slot for District Effect
  /**
   * @description Effect for loading slots list from API based on action Load Vaccine Slot
   */
  loadAvailableSlotsForADistrict$ = createEffect((): any => this.actions$.pipe(
    ofType(VaccineActions.loadVaccineSlots),
    withLatestFrom(this._selectedDistrict$, this._selectedDate$),
    switchMap((payload: [Action, Districts, string]) => {
      return this.httpService.getSlotsForADistrict(payload[1]?.districtId, payload[2]).pipe(
        map(data => {
          // to convert response from snake_case to camelCase
          const res = camelCaseRecursive(data);
          return VaccineActions.loadVaccineSlotsSuccess({ data: res });
        }
        ),
        catchError(error => of(VaccineActions.loadVaccineSlotsFailure({ error })))
      );
    })
  ));
  //#endregion

  //#region Load Vaccine Slot for Pincode Effect
  /**
   * @description Effect for loading slots list from API based on action Load Vaccine Slot
   */
  loadAvailableSlotsForAPincode$ = createEffect((): any => this.actions$.pipe(
    ofType(VaccineActions.loadVaccineSlotsByPincode),
    withLatestFrom(this._selectedPincode$, this._selectedDate$),
    switchMap((payload: [Action, number, string]) => {
      return this.httpService.getSlotsForPinCode(payload[1], payload[2]).pipe(
        map(data => {
          // to convert response from snake_case to camelCase
          const res = camelCaseRecursive(data);
          return VaccineActions.loadVaccineSlotsSuccess({ data: res });
        }
        ),
        catchError(error => of(VaccineActions.loadVaccineSlotsFailure({ error })))
      );
    })
  ));
  //#endregion

  //#region Load Default Date Effect
  /**
   * @description Effect for loading default date
   */
  loadDefaultDate$ = createEffect((): any => this.actions$.pipe(
    ofType(VaccineActions.LoadDefaultDate),
    switchMap(() => {
      return of(this.commonDateService.getDefaultDate()).pipe(
        map(data => {
          return VaccineActions.selectedDate({ data: data });
        }
        ),
        catchError(error => of(VaccineActions.selectedDate({ data: error })))
      );
    })
  ));
  //#endregion

  //#region Hydration set Effects

  hydrate$ = createEffect((): any => this.actions$.pipe(
    ofType(VaccineActions.hydrate),
    map(() => {
      const storageValue = localStorage.getItem("state");
      if (storageValue) {
        try {
          const state = JSON.parse(storageValue);
          return VaccineActions.hydrateSuccess({ data: state });
        } catch {
          localStorage.removeItem("state");
        }
      }
      return VaccineActions.hydrateFailure({ error: "error" });
    })
  )
  );

  //#endregion

  //#region Hydration save effects

  // hydration.effects.ts
  serialize$ = createEffect((): any => this.actions$.pipe(
    ofType(VaccineActions.hydrateSuccess, VaccineActions.hydrateFailure),
    switchMap(() => this.store),
    distinctUntilChanged(),
    tap((state) => localStorage.setItem("state", JSON.stringify(state)))
  ),
    { dispatch: false }
  );
  //#endregion

  constructor(
    private actions$: Actions, private store: Store<VaccineStoreState>,
    private httpService: VaccineFinderHttpService,
    private commonDateService: CommonDateService) { }


  ngrxOnInitEffects(): Action {
    return VaccineActions.hydrate();
  }
}
