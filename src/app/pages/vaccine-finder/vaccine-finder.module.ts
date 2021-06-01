import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VaccineFinderRoutingModule } from './vaccine-finder-routing.module';
import { VaccineFinderComponent } from './vaccine-finder.component';
import { MatButtonModule } from '@angular/material/button';
import { PincodeComponent } from './components/pincode/pincode.component';
import { DistrictComponent } from './components/district/district.component';

import { HttpClientModule } from '@angular/common/http';
import { VaccineStoreModule } from './store/vaccine-store.module';
import { VaccineFinderHttpService } from './services/vaccine-finder-http.service';
import { VaccineFinderFacadeService } from './services/vaccine-finder-facade.service';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatCardModule} from '@angular/material/card';
import { CountdownModule } from 'ngx-countdown';
import {MatChipsModule} from '@angular/material/chips';
import {MatInputModule} from '@angular/material/input';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { FilteredSlotCountPipe } from './pipes/filtered-slot-count.pipe';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CustomCalendarComponent } from './components/custom-calendar/custom-calendar.component';
import { AvailableSlotViewComponent } from './components/available-slot-view/available-slot-view.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
// All imports for material
const materialImports = [
  MatButtonModule,
  MatSelectModule,
  MatFormFieldModule,
  MatCardModule,
  MatChipsModule,
  MatInputModule,
  MatTooltipModule,
  MatSnackBarModule,
]

@NgModule({
  declarations: [
    VaccineFinderComponent,
    PincodeComponent,
    DistrictComponent,
    CustomDatePipe,
    FilteredSlotCountPipe,
    CustomCalendarComponent,
    AvailableSlotViewComponent
  ],
  providers: [VaccineFinderHttpService, VaccineFinderFacadeService],
  imports: [
    CommonModule,
    VaccineFinderRoutingModule,
    ...materialImports,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    VaccineStoreModule,
    SharedModule,
    CountdownModule
  ]
})
export class VaccineFinderModule { }
