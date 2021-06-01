import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VaccineStoreState } from '../../models/store-state.model';
import {vaccineFeatureKey } from './vaccine.reducer';

export const selectVaccineFeature = createFeatureSelector<any, VaccineStoreState>(vaccineFeatureKey);

/**
 * @description Select all States List
 */
export const selectStatesList = createSelector(selectVaccineFeature, (state: VaccineStoreState) => state?.statesList);

/**
 * @description Select all Districts List
 */
export const selectDistrictsList = createSelector(selectVaccineFeature, (state: VaccineStoreState) => state?.districtsList);

/**
 * @description Select Selected State
 */
export const SelectedState = createSelector(selectVaccineFeature, (state: VaccineStoreState) => state?.selectedState);

/**
 * @description Select Selected District
 */
export const SelectedDistrict = createSelector(selectVaccineFeature, (state: VaccineStoreState) => state?.selectedDistrict);

/**
 * @description Select Selected Date
 */
export const SelectedDate = createSelector(selectVaccineFeature, (state: VaccineStoreState) => state?.selectedDate);

/**
 * @description Select Available Vaccine slots
 */
export const SelecteAvailableVaccineSlots = createSelector(selectVaccineFeature, (state: VaccineStoreState) => state?.slotsAvailable);

/**
 * @description Select Selected Pincode
 */
 export const SelectedPincode = createSelector(selectVaccineFeature, (state: VaccineStoreState) => state?.selectedPincode);


/**
 * @description Select Notification Settings
 */
 export const SelectNotificationSettings = createSelector(selectVaccineFeature, (state: VaccineStoreState) => state?.isNotificationMute);
