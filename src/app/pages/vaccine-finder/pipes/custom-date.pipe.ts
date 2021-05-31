import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: string, formate: string): string {

    const _monthNames: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const _weekDays: string[] = ["Sun", "Mon", "Tue", "Wed", "Thus", "Fri", "Sat"]
     const date = value.split("-");

    const customeDate = new Date(`${date[1]}-${date[0]}-${date[2]}`);

    switch (formate) {
      case "month":
        return _monthNames[customeDate.getMonth()];
      case "day":
        return _weekDays[customeDate.getDay()];
      case "date":
        return date[0];
      default:
        customeDate;
    }

    return "";
  }

}
