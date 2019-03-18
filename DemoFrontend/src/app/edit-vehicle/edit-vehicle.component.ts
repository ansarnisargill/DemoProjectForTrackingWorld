import { Vehicle } from './../Vehicle';
import { VehiclesService } from './../vehicles-serice.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.css']
})
export class EditVehicleComponent implements OnInit {
  public vehicleToEdit: Vehicle;
  constructor(private vehicleService: VehiclesService, private router: Router) {
    this.vehicleToEdit = this.vehicleService.VehicleToEdit;
  }
  ngOnInit() {
  }
  SubmitData() {
    this.vehicleService.UpdateVehicle(this.vehicleToEdit).subscribe(
      () => { },
      (error) => { },
      () => {
        this.vehicleService.EditedVehicle = true;
        this.router.navigateByUrl('/home');
      }

    );

  }
  GoBack() {
    this.router.navigateByUrl('/home');
  }
}
