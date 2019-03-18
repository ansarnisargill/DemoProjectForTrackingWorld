import { Vehicle } from './../Vehicle';
import { Component, OnInit, NgModule } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { NgForm } from '@angular/forms';
import { VehiclesService } from '../vehicles-serice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-data',
  templateUrl: './upload-data.component.html',
  styleUrls: ['./upload-data.component.css']
})
export class UploadDataComponent implements OnInit {
  arrayBuffer: any;
  file: File = null;
  vehicles: Vehicle[] = [];
  FileSelectionError = false;
  ErrorText = '';
  ErrorHeader = '';
  constructor(private vehicleService: VehiclesService, private router: Router) { }

  ngOnInit() {
  }
  incomingfile(event: any) {
    this.file = event.target.files[0];
    if (!this.file.name.includes('.xlsx')) {
      this.FileSelectionError = true;
      this.ErrorHeader = 'Selected File Error! ';
      this.ErrorText = 'Not an excel file.';
    }
    else {
      this.FileSelectionError = false;
    }
  }

  Upload() {
    if (this.FileSelectionError === true) {
      return false;
    }
    if (this.file === null) {
      this.FileSelectionError = true;
      this.ErrorHeader = 'No File! ';

      this.ErrorText = 'Select an excel file first.';
    }
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i !== data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const ArrayOfObjects = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.vehicleService.VehiclesFromExcel = [];
      ArrayOfObjects.map(
        (val) => {
          const vcl = val as Vehicle;
          if (vcl.active != null) {
            this.vehicleService.VehiclesFromExcel.push(vcl);
          }
        });
      if (this.vehicleService.VehiclesFromExcel.length === 0) {
        this.FileSelectionError = true;
        this.ErrorHeader = 'Error In Excel File! ';
        this.ErrorText = 'Make sure There is no space in excel file headers and Headers are in camal case.';
      }
      else {
        this.router.navigateByUrl('/exceldata');
      }
    };
    fileReader.readAsArrayBuffer(this.file);

  }
  SubmitData(form: NgForm) {
    const vehicle: Vehicle = new Vehicle();
    vehicle.active = form.value.active;
    vehicle.chasisNo = form.value.chasisNo;
    vehicle.color = form.value.color;
    vehicle.dateOfPurchase = form.value.dateOfPurchase;
    vehicle.make = form.value.make;
    vehicle.model = form.value.model;
    vehicle.engineNo = form.value.engineNo;
    vehicle.regNo = form.value.regNo;
    this.vehicleService.CreateVehicle(vehicle).subscribe(
      () => { },
      (error) => { },
      () => {
        this.vehicleService.addedNewRecord = true;
        this.router.navigateByUrl('/home');
      }

    );

  }
  GoBack() {
    this.router.navigateByUrl('/home');
  }
}
