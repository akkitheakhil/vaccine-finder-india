import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { VaccineEffects } from './vaccine/vaccine.effects';
import { reducer as vaccineReducer, vaccineFeatureKey } from './vaccine/vaccine.reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature([VaccineEffects]),
    StoreModule.forFeature(vaccineFeatureKey, vaccineReducer)
  ]
})

export class VaccineStoreModule { }
