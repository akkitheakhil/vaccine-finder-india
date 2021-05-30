import { VaccineSlotsDetails } from "./vaccine-slots";

export interface AvailableSlotData {
  totalSlotsAvailable: number,
  slotsDetails: VaccineSlotsDetails[]
}
