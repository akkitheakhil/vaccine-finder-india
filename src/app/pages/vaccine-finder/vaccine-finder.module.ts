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
import { NotificationPipe } from './pipes/notification.pipe';
import {MatInputModule} from '@angular/material/input';
import { CustomDatePipe } from './pipes/custom-date.pipe';
// All imports for material
const materialImports = [
  MatButtonModule,
  MatSelectModule,
  MatFormFieldModule,
  MatCardModule,
  MatChipsModule,
  MatInputModule,
]

@NgModule({
  declarations: [
    VaccineFinderComponent,
    PincodeComponent,
    DistrictComponent,
    NotificationPipe,
    CustomDatePipe
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
