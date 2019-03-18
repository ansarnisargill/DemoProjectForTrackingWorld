import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { UploadDataComponent } from './upload-data/upload-data.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PostDataFromExcelComponent } from './post-data-from-excel/post-data-from-excel.component';
import { EditVehicleComponent } from './edit-vehicle/edit-vehicle.component';
const appRoutes: Routes = [ {
  path: 'upload',
  component: UploadDataComponent,
  pathMatch: 'full',
  data: { title: 'Data Upload | Excel' }
},
{
  path: 'home',
  component: HomeComponent,
  pathMatch: 'full',
  data: { title: 'Data Search Page' }
},
{
  path: '',
  component: AppComponent,
  pathMatch: 'full',
  data: { title: 'Data Search Page' }
},
{
  path: 'exceldata',
  component: PostDataFromExcelComponent,
  pathMatch: 'full',
  data: { title: 'Data From Excel sheet' }
},
{
  path: 'edit',
  component: EditVehicleComponent,
  pathMatch: 'full',
  data: { title: 'Edit Vehicle' }
}
];
@NgModule({
  declarations: [
    AppComponent,
    UploadDataComponent,
    HomeComponent,
    PostDataFromExcelComponent,
    EditVehicleComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
