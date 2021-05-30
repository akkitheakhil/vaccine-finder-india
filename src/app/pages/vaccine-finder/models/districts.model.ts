export interface Districts {
  districtId: number;
  districtName: string;
}

export interface DistrictsList {
  districts: Districts[];
  ttl?: number;
}
