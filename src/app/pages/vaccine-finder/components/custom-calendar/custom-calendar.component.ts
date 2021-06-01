import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { isEmptyData } from 'src/app/shared/utils/common.util';
import { VaccineFinderFacadeService } from '../../services/vaccine-finder-facade.service';

@Component({
  selector: 'covac-custom-calendar',
  templateUrl: './custom-calendar.component.html',
  styleUrls: ['./custom-calendar.component.scss']
})
export class CustomCalendarComponent implements OnInit {

  constructor(private facadeService: VaccineFinderFacadeService) { }
  @Input() selectedDate = this.facadeService.getDefaultDate();
  initalDay = 1;

  @Output() dateChange = new EventEmitter();

  calendar: string[] = [];

  ngOnInit(): void {
    this.calendar = [...this.facadeService.getNextCalendarDates("DD-MM-YYYY", this.initalDay, 4)];
  }

  newSelectedDate(date: string): void {
    this.selectedDate = date;
    this.dateChange.emit(true);
    this.facadeService.updateSelectedDate(this.selectedDate);
  }

  nextcalendarDays() {
    this.initalDay += 4;
    this.calendar = [...this.facadeService.getNextCalendarDates("DD-MM-YYYY", this.initalDay, 4)];
  }

  prevcalendarDays() {
    this.initalDay -= 4;
    this.calendar = [...this.facadeService.getNextCalendarDates("DD-MM-YYYY", this.initalDay, 4)];
  }

}
