import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule, MatSnackBarModule, MatTableModule, MatSortModule, MatIconModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { FilterComponent } from './filter/filter.component';
import { HttpClientModule } from '@angular/common/http';

import { NgxChartsModule } from '@swimlane/ngx-charts';

const ANGULAR_IMPORTS = [
  BrowserAnimationsModule,
  FormsModule,
  ReactiveFormsModule,
  FlexLayoutModule,
  HttpClientModule
];

const MATERIAL_IMPORTS = [
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonModule,
  MatDialogModule,
  MatSnackBarModule,
  MatTableModule,
  MatSortModule,
  MatIconModule
];

const UTIL_IMPORTS = [
NgxChartsModule
];
@NgModule({
  declarations: [FilterComponent],
  entryComponents: [FilterComponent],
  providers: [MatDatepickerModule, DatePipe],
  imports: [
    CommonModule,
    ANGULAR_IMPORTS,
    MATERIAL_IMPORTS,
    UTIL_IMPORTS
  ],
  exports: [
    CommonModule,
    ANGULAR_IMPORTS,
    MATERIAL_IMPORTS,
    UTIL_IMPORTS
  ]
})
export class SharedModule { }
