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
   * @description - Get Array of Dates for next 7 Days
   * @param format - Format to which date should be formatted to
   * @param initalDay - Sets Initial day from which to add
   */
  getNextSevenDays(format: string = "DD-MM-YYYY", initalDay: number = 1) {
    const sevenDaysDates: string[] = [];
    let date;
    Array.from(Array(7)).forEach((x, i) => {
      date = moment().add(i+initalDay, 'days');
      sevenDaysDates.push(moment(date).format(format));
    });
    return sevenDaysDates;
  }
}
