import { Vehicle } from './../Vehicle';
import { VehiclesService } from './../vehicles-serice.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-post-data-from-excel',
  templateUrl: './post-data-from-excel.component.html',
  styleUrls: ['./post-data-from-excel.component.css']
})
export class PostDataFromExcelComponent implements OnInit {
  ShowLoader = false;
  vehicles: Vehicle[] = [];
  constructor(private vehicleService: VehiclesService, private router: Router) {
    this.vehicles = this.vehicleService.VehiclesFromExcel;
  }

  ngOnInit() { }
  SaveAll() {
    this.ShowLoader = true;
    let iter = this.vehicleService.VehiclesFromExcel.length;
    let i = 0;
    this.vehicleService.VehiclesFromExcel
      .map((val) => {
        this.vehicleService.CreateVehicle(val).subscribe(() => { }, () => { },
          () => {
            i += 1;
            if (i === iter) {
              this.router.navigateByUrl('/home');

            }
          });
      });
  }

}
