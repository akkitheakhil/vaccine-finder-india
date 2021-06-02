import { CommonApiDataEndpoints } from "src/app/shared/models/endpoints.model";
import { CustomSlotFilter } from "../models/filter.model";

export class VaccineFinderConstant {

  public _vaccineApiEndPoints: { [key in string]: CommonApiDataEndpoints } = {
    byDistrict: {
      endpoint: "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict",
      queryParams: [{ name: 'district_id', values: [""] }, { name: 'date', values: [""] }]
    },
    byPincode: {
      endpoint: "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin",
      queryParams: [{ name: 'pincode', values: [""] }, { name: 'date', values: [""] }]
    },
    findStateCode: {
      endpoint: "https://cdn-api.co-vin.in/api/v2/admin/location/states",
    },
    findDistrictCode: {
      endpoint: "https://cdn-api.co-vin.in/api/v2/admin/location/districts/{{statecode}}",
    },
  }

  public CustomFilters: CustomSlotFilter = {
    minAgeLimit: [18, 45],
    vaccine: ["COVAXIN", "COVISHIELD", "SPUTNIKV"],
    feeType: ["Paid", "Free"]
  };

  public cowinPortalUrl: string = "https://selfregistration.cowin.gov.in/";

  public _routes = {
    byDistrict: "district",
    byPincode: "pincode"
  }
}
