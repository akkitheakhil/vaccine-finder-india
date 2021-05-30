import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistrictComponent } from './components/district/district.component';
import { PincodeComponent } from './components/pincode/pincode.component';
import { VaccineFinderComponent } from './vaccine-finder.component';

const routes: Routes = [
  { path: '',  children: [
    { path: '', component:VaccineFinderComponent },
    { path: 'pincode', component: PincodeComponent },
    { path: 'district', component: DistrictComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class VaccineFinderRoutingModule { }
