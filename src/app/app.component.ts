import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CheckForUpdateService } from './shared/services/check-for-update.service';

@Component({
  selector: 'covac-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Covid Vaccine Finder';
  showLoader: boolean = true;

  constructor( private checkForUpdate: CheckForUpdateService,
    private cdr: ChangeDetectorRef) { }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.checkForUpdate.checkForUpdate()
    .subscribe(result => {
      this.showLoader = result;
      this.cdr.detectChanges();
    }, (error) => {
      this.showLoader = false;
    });
  }
}
