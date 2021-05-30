import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryParamsModel } from 'src/app/shared/models/endpoints.model';
import { isEmptyData } from 'src/app/shared/utils/common.util';
import { VaccineFinderConstant } from '../constants/vaccine-finder-constants.model';
import { DistrictsList } from '../models/districts.model';
import { StatesList } from '../models/states.model';
import { VaccineSlots } from '../models/vaccine-slots';

@Injectable({
  providedIn: 'root'
})
export class VaccineFinderHttpService {

  private _vaccineFinderConst = new VaccineFinderConstant();
  constructor(private http: HttpClient) { }

  /**
   * @description This will fetch data from the Public API which returns all the states in their list
   * with their respective state codes.
   * @returns Observable of 'StatesList' model
   */
  getAllStateCode(): Observable<StatesList> {
    return this.http.get<StatesList>(this._vaccineFinderConst._vaccineApiEndPoints.findStateCode.endpoint);
  }

  /**
   * @description This will fetch data from the Public API which returns all the districts in their list
   * corresponding to their StateCode.
   * @param stateCode - String - A code assigned to a specific state.
   * @returns Observable of(DistrictsList)
   */
  getAllDistricts(stateCode: number): Observable<DistrictsList> {
    const url = this._vaccineFinderConst._vaccineApiEndPoints.findDistrictCode.endpoint.replace("{{statecode}}", stateCode.toString());
    return this.http.get<DistrictsList>(url);
  }

  /**
 * @description This will fetch data from the Public API which returns all the slot for their
 * corresponding to their district and date.
 * @param districtCode - String - A code assigned to a specific district.
 * @param selectedDate - String - date.
 * @returns Observable of(DistrictsList)
 */
  getSlotsForADistrict(districtCode: number, selectedDate: string): Observable<VaccineSlots> {
    let query = this._vaccineFinderConst._vaccineApiEndPoints.byDistrict.queryParams;
    const _district_code = { name: 'district_id', values: [districtCode.toString()] }
    const _date = { name: 'date', values: [selectedDate] }
    query = [_district_code, _date];
    const params = this.buildQueryParams(query);
    const url = this._vaccineFinderConst._vaccineApiEndPoints.byDistrict.endpoint;
    return this.http.get<VaccineSlots>(url, { params });
  }


  /**
* @description This will fetch data from the Public API which returns all the slot for their
* corresponding to their pincode and date.
* @param pincode - number - Pincode of that specific area.
* @param selectedDate - String - date.
* @returns Observable of(VaccineSlots)
*/
  getSlotsForPinCode(pincode: number, selectedDate: string): Observable<VaccineSlots> {
    let query = this._vaccineFinderConst._vaccineApiEndPoints.byPincode.queryParams;
    const _pincode = { name: 'pincode', values: [pincode.toString()] }
    const _date = { name: 'date', values: [selectedDate] }
    query = [_pincode, _date];
    const params = this.buildQueryParams(query);
    const url = this._vaccineFinderConst._vaccineApiEndPoints.byPincode.endpoint;
    return this.http.get<VaccineSlots>(url, { params });
  }

  /**
   * @description This will build a queryParam(HttpParams) string with all the keys and values passed.
   * @param queryParams {QueryParamsModel}
   * @returns HttpParams
   * @example - "?pincode=695024&date=31-03-2021"
   */
  buildQueryParams(queryParams: QueryParamsModel[]): HttpParams {
    let _httpParams = new HttpParams();
    if (isEmptyData(queryParams)) {
      return _httpParams;
    }

    queryParams?.forEach((queryItem) => {
      queryItem?.values?.forEach(val => {
        _httpParams = _httpParams.append(encodeURIComponent(queryItem?.name), encodeURIComponent(val))
      })
    });

    return _httpParams;
  }
}
