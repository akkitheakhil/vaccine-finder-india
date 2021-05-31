import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CommonDateService {

   _monthNames: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  constructor() { }

  /**
   * @description - Get the default date. Currently it is current Date + 1
   * @param format - Date to be formatted in
   * @returns
   */
  getDefaultDate(format: string = "DD-MM-YYYY"): string {
    let date = moment().add(1, 'days');
    return moment(date).format(format);
  }

  /**
   * @function getFormattedDate format date string
   * @param format - Format to format the date
   * @param date - Date Object
   */
  private getFormattedDate(format: string, date: Date | string): string {
    return moment(date).format(format);
  }


  /**
   * @description - Get Array of Dates from calender based on the days needed
   * @param format - Format to which date should be formatted to
   * @param initalDay - Sets Initial day from which to add
   * @param daysNeeded - No of days required.
   */
  getCalenderDates(format: string = "DD-MM-YYYY", initalDay: number = 1, daysNeeded: number = 7) {
    const calenderDates: string[] = [];
    let date;
    Array.from(Array(daysNeeded)).forEach((x, i) => {
      date = moment().add(i+initalDay, 'days');
      calenderDates.push(moment(date).format(format));
    });
    return calenderDates;
  }
}
