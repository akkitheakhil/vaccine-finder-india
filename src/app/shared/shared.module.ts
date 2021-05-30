import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsEmptyPipe } from './utils/pipes/is-empty.pipe';
import { ToDatePipe } from './utils/pipes/to-date.pipe';
import { DataFilterPipe } from './utils/pipes/data-filter.pipe';




@NgModule({
  declarations: [
    IsEmptyPipe,
    ToDatePipe,
    DataFilterPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    IsEmptyPipe,
    ToDatePipe,
    DataFilterPipe
  ]
})
export class SharedModule { }
