import { Vehicle } from './../Vehicle';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { VehiclesService } from '../vehicles-serice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  dtOptions: any = {};
  vehicles: Vehicle[] = [];
  isDataLoaded = false;
  ConnectivityError = false;
  RecordDeleted = false;

  constructor(private vehicleService: VehiclesService, private router: Router) {
    this.PutDataInTable();
  }
  PutDataInTable() {
    this.vehicleService.GetAllVehicles()
      .subscribe((response) => { this.vehicles = response; },
        (error) => { this.isDataLoaded = true; this.ConnectivityError = true; },
        () => { this.isDataLoaded = true; this.ConnectivityError = false; });
  }
  ngOnInit(): void {
    this.dtOptions = {

      dom: 'Bfrtip',
      buttons: [
        'excel'
      ],
      responsive: true
    };
  }
  ngOnDestroy(): void {
    this.vehicleService.addedNewRecord = false;
  }
  Edit(v: Vehicle) {
    this.vehicleService.VehicleToEdit = v;
    this.router.navigateByUrl('/edit');
    this.vehicleService.EditedVehicle=false;
    this.vehicleService.addedNewRecord = false;

  }
  Delete(id: number) {
    this.isDataLoaded = false;
    this.vehicleService.EditedVehicle=false;
    this.vehicleService.addedNewRecord = false;
    this.vehicleService.DeleteVehicle(id)
      .subscribe(
        () => { },
        () => { },
        () => { this.isDataLoaded = false; this.PutDataInTable(); this.RecordDeleted = true; });
    this.RecordDeleted = false;
  }
  GoToDataupload() {
    this.router.navigateByUrl('/upload');

  }

}
