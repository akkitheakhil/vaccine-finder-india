import { DistrictsList, Districts } from "./districts.model";
import { States, StatesList } from "./states.model";
import { VaccineSlots } from "./vaccine-slots";

export interface VaccineStoreState {
  statesList: StatesList;
  districtsList: DistrictsList;
  selectedState: States,
  selectedDistrict: Districts,
  selectedDate: string;
  slotsAvailable: VaccineSlots,
  selectedPincode: number;
}
