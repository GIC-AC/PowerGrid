import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { LayoutModule } from "@progress/kendo-angular-layout";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { IconsModule } from "@progress/kendo-angular-icons";
import { HttpClientModule } from '@angular/common/http';
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { LabelModule } from "@progress/kendo-angular-label";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { NavigationModule } from "@progress/kendo-angular-navigation";

import { RouterModule, Routes } from '@angular/router';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { IntlModule } from '@progress/kendo-angular-intl';
import { ScrollViewModule } from '@progress/kendo-angular-scrollview';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { UploadsModule } from '@progress/kendo-angular-upload';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { AppConfig } from './Service/app-config.service';
import { AuthGuard } from './Service/LogIn/auth-guard.service';
import { SingleFormComponent } from './form/single-form/single-form.component';
function initConfig(config: AppConfig) {
  return () => config.ensureInit();
}

const routes: Routes = [
  {
    path: '',
    //canLoad: [AuthGuard],
    component: FormComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SingleFormComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes, { useHash: true }),
    ReactiveFormsModule,
    LayoutModule,
    IconsModule,
    ButtonsModule,
    InputsModule,
    LabelModule,
    DropDownsModule,
    BrowserAnimationsModule,
    DateInputsModule,
    HttpClientModule,
    NavigationModule,
    DialogModule,
    GridModule,
    UploadsModule,
    IntlModule,
    ExcelExportModule,
    ExcelModule,
    TooltipModule,
    ScrollViewModule,
    NotificationModule
  ],
  providers: [ AppConfig,
    { provide: APP_INITIALIZER, useFactory: initConfig, deps: [AppConfig], multi: true },],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
