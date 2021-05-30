import { createAction, props } from '@ngrx/store';

//#region Load List of States

/**
 * @description Action for loading List of States from API
 */
export const loadListOfStates = createAction(
  '[Vaccine] Load List Of States'
);

/**
 * @description Action for handling success from api for Load List of States
 */
export const loadListOfStatesSuccess = createAction(
  '[Vaccine] Load List Of States Success',
  props<{ data: any }>()
);

/**
 * @description Action for handling failure from api for Load List of States
 */
export const loadListOfStatesFailure = createAction(
  '[Vaccine] Load List Of States Failure',
  props<{ error: any }>()
);

//#endregion

//#region Load List of Districts

/**
 * @description Action for loading List of Districts from API based on the selected state
 */
export const loadListOfDistricts = createAction(
  '[Vaccine] Load List Of Districts'
);

/**
 * @description Action for handling success from api for Load List of Districts
 */
export const loadListOfDistrictsSuccess = createAction(
  '[Vaccine] Load List Of Districts Success',
  props<{ data: any }>()
);

/**
 * @description Action for handling failure from api for Load List of Districts
 */
export const loadListOfDistrictsFailure = createAction(
  '[Vaccine] Load List Of States Failure',
  props<{ error: any }>()
);

//#endregion

//#region Selected State

/**
 * Action when a new state is selected from the dropdown
 */
export const selectedState = createAction(
  '[Vaccine] Selected State',
  props<{ data: any }>()
);

//#endregion

//#region Selected District

/**
 * Action when a new District is selected from the dropdown
 */
export const selectedDistrict = createAction(
  '[Vaccine] Selected District',
  props<{ data: any }>()
);

//#endregion

//#region Selected Date
/**
 * Action when a new date is selected
 */
export const selectedDate = createAction(
  '[Vaccine] Selected Date',
  props<{ data: any }>()
);
//#endregion

//#region Load Default Date
/**
 * Action when a new date is selected
 */
export const LoadDefaultDate = createAction(
  '[Vaccine] Load Default Date'
);
//#endregion

//#region Load Vaccine Slots

/**
 * @description Action for loading Vaccine Slots from API
 */
export const loadVaccineSlots = createAction(
  '[Vaccine] Load Vaccine Slots'
);

/**
 * @description Action for loading Vaccine Slots from API
 */
export const loadVaccineSlotsByPincode = createAction(
  '[Vaccine] Load Vaccine Slots By Pincode'
);

/**
 * @description Action for handling success from api for Load Vaccine Slots
 */
export const loadVaccineSlotsSuccess = createAction(
  '[Vaccine] Load Vaccine Slots Success',
  props<{ data: any }>()
);

/**
 * @description Action for handling failure from api for Load Vaccine Slots
 */
export const loadVaccineSlotsFailure = createAction(
  '[Vaccine] Load Vaccine Slots Failure',
  props<{ error: any }>()
);

//#endregion

//#region Selected Pincode
/**
 * Action when a new pincode is selected
 */
export const selectedPincode = createAction(
  '[Vaccine] Selected Pincode',
  props<{ data: any }>()
);
//#endregion

