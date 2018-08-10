import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular/umd';

import { ToastrService } from 'ngx-toastr';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { DataService } from '../../app/Services/DataService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {

  public message: string;
    public values: any[];

  constructor(public navCtrl: NavController, 
    private _dataService: DataService,
    private _toasterService: ToastrService,
    private _slimLoadingBarService: SlimLoadingBarService) {

  }

  ngOnInit() {
    this._slimLoadingBarService.start();

    this._dataService
        .getAll<any[]>()
        .subscribe((data: any[]) => this.values = data,
        error => () => {
          this._toasterService.error('everything is broken', 'Major Error', {
            timeOut: 3000
          });
        },
        () => {
          this._toasterService.success('OK', 'Tudo OK'); 
            this._slimLoadingBarService.complete();
        });
}

}
