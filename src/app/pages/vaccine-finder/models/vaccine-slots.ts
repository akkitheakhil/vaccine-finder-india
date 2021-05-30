export interface VaccineSlotsDetails {
  centerId: number;
  name: string;
  address: string;
  stateName: string;
  districtName: string;
  blockName: string;
  pincode: number;
  from: string;
  to: string;
  lat: number;
  long: number;
  feeType: string;
  sessionId: string;
  date: string;
  availableCapacityDose1: number;
  availableCapacityDose2: number;
  availableCapacity: number;
  fee: string;
  minAgeLimit: number;
  vaccine: string;
  slots: string[];
}

export interface VaccineSlots {
  sessions: VaccineSlotsDetails[];
}
