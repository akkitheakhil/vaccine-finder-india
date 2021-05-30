import { CommonApiDataEndpoints } from "src/app/shared/models/endpoints.model";

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


  public filters: {name: any, label: string}[] = [
    { name: "ageGroup18", label: "AGE 18+"},
    { name: "ageGroup45", label: "AGE 45+"},
    { name: "vaccineCovaxin", label: "COVAXIN"},
    { name: "vaccineCovishield", label: "COVISHIELD"},
    { name: "vaccineSputnikv", label: "SPUTNIK V"},
    { name: "feeTypePaid", label: "PAID"},
    { name: "feeTypeFree", label: "FREE"},
  ];

  public vaccineFilters: {name: any, label: string}[] = [
    { name: "vaccineCovaxin", label: "COVAXIN"},
    { name: "vaccineCovishield", label: "COVISHIELD"},
    { name: "vaccineSputnikv", label: "SPUTNIK V"},
  ]

  public CustomFilters = {
    ageGroup18: item => item.minAgeLimit === 18,
    ageGroup45: item => item.minAgeLimit === 45,
    vaccineCovaxin: item => item.vaccine === "COVAXIN",
    vaccineCovishield: item => item.vaccine === "COVISHIELD",
    vaccineSputnikv: item => item.vaccine === "SPUTNIKV",
    feeTypePaid: item => item.feeType === "Paid",
    feeTypeFree: item => item.feeType === "Free",
  }

  public allCustomFilters = {
    ageGroup18: item => item.minAgeLimit === 18,
    ageGroup45: item => item.minAgeLimit === 45,
    ageAny: item => item.minAgeLimit === 45 || item.minAgeLimit === 18,
    vaccineCovaxin: item => item.vaccine === "COVAXIN",
    vaccineCovishield: item => item.vaccine === "COVISHIELD",
    vaccineSputnikv: item => item.vaccine === "SPUTNIKV",
    vaccineCovaxinAndCovishield: item => item.vaccine === "COVISHIELD" || item.vaccine === "COVAXIN",
    vaccineCovishieldAndSputnikv: item => item.vaccine === "COVISHIELD" || item.vaccine === "SPUTNIKV",
    vaccineCovaxinAndSputnikv: item => item.vaccine === "COVAXIN" || item.vaccine === "SPUTNIKV",
    vaccineAny: item => item.vaccine === "COVISHIELD" || item.vaccine === "SPUTNIKV" || item.vaccine === "COVAXIN",
    feeTypePaid: item => item.feeType === "Paid",
    feeTypeFree: item => item.feeType === "Free",
    feeTypeAny: item => item.feeType === "Free" || item.feeType === "Paid",
  }
}
