import { Action, createReducer, on } from '@ngrx/store';
import { VaccineStoreState } from '../../models/store-state.model';
import * as VaccineActions from './vaccine.actions';

export const vaccineFeatureKey = 'vaccine';

export const initialState: VaccineStoreState = {
  districtsList: { districts: [] },
  statesList: { states: [] },
  selectedState: { stateId: -1, stateName: "" },
  selectedDistrict: { districtId: -1, districtName: "" },
  selectedDate: "",
  slotsAvailable: { sessions: [] },
  selectedPincode: 0,
  isNotificationMute: { isMute: false },
  currentRoute: "",
};

export const reducer = createReducer(
  initialState,

  // Load List of States reducer
  on(VaccineActions.loadListOfStatesSuccess, (state, { data }) => ({ ...state, statesList: data })),
  on(VaccineActions.loadListOfStatesFailure, (state, { error }) => ({ ...state, statesList: error })),

  // Load List of States reducer
  on(VaccineActions.loadListOfDistrictsSuccess, (state, { data }) => ({ ...state, districtsList: data })),
  on(VaccineActions.loadListOfDistrictsFailure, (state, { error }) => ({ ...state, districtsList: error })),

  // Selected State
  on(VaccineActions.selectedState, (state, { data }) => ({
    ...state,
    selectedState: data,
    })),

  // Selected District
  on(VaccineActions.selectedDistrict, (state, { data }) => ({
    ...state,
    selectedDistrict: data,
    slotsAvailable: { sessions: []}
   })),

  // Selected District
  on(VaccineActions.selectedDate, (state, { data }) => ({ ...state, selectedDate: data })),

  // Load List of States reducer
  on(VaccineActions.loadVaccineSlotsSuccess, (state, { data }) => ({ ...state, slotsAvailable: data })),
  on(VaccineActions.loadVaccineSlotsFailure, (state, { error }) => ({ ...state, slotsAvailable: error })),

  // Selected Pincode
  on(VaccineActions.selectedPincode, (state, { data }) => ({
    ...state,
    selectedPincode: data,
    slotsAvailable: { sessions: []}
   })),

  // Load List of States reducer
  on(VaccineActions.hydrateSuccess, (state, { data }) =>
  {
    return {
      ...state,
      districtsList: data?.vaccine?.districtsList,
      statesList: data?.vaccine?.statesList,
      selectedState: data?.vaccine?.selectedState,
      selectedDistrict: data?.vaccine?.selectedDistrict,
      selectedDate: data?.vaccine?.selectedDate,
      slotsAvailable: data?.vaccine?.slotsAvailable,
      selectedPincode: data?.vaccine?.selectedPincode,
      isNotificationMute: data?.vaccine?.isNotificationMute || { isMute: false},
      currentRoute: data?.vaccine?.currentRoute || ""
    }
  }
  ),
  on(VaccineActions.loadVaccineSlotsFailure, (state, { error }) => ({ ...state, slotsAvailable: error })),

  on(VaccineActions.muteNotifications, (state, { data }) => ({ ...state, isNotificationMute: data })),

  on(VaccineActions.saveCurrentRoute, (state, { data }) => ({ ...state, currentRoute: data })),


);

function storeDateToLocalStorage(key: string, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
