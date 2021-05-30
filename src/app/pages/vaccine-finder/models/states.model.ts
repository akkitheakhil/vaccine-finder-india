export interface States {
  stateId: number;
  stateName: string;
}

export interface StatesList {
  states: States[];
  ttl?: number;
}
