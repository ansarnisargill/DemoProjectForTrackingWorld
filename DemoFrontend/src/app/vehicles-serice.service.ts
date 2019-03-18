import { Vehicle } from './Vehicle';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  public ApiAddress: string;
  public addedNewRecord = false;
  public EditedVehicle = false;
  public VehiclesFromExcel: Vehicle[] = [];
  public VehicleToEdit: Vehicle = new Vehicle();
  constructor(private http: HttpClient) {
    this.ApiAddress = 'https://localhost:5001/api/vehicle';
  }
  GetAllVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.ApiAddress);
  }
  DeleteVehicle(id: number) {
    return this.http.delete(this.ApiAddress + '/' + id);
  }
  CreateVehicle(vehicle: Vehicle) {
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.ApiAddress, JSON.stringify(vehicle), { headers: header });

  }
  UpdateVehicle(vehicle: Vehicle) {
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(this.ApiAddress, JSON.stringify(vehicle), { headers: header });
  }
}
