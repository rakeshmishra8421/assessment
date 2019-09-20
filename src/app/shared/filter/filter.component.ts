import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateUtils } from '../date.util';
import { DatePipe } from '@angular/common';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  filterForm: FormGroup;
  today: Date;
  yesterday: Date;

  constructor(
    public dialogRef: MatDialogRef<FilterComponent>,
    public formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar
  ) {
    this.today = DateUtils.getDateToday();
    this.yesterday = DateUtils.getPrevDateToday();
  }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      from: '',
      to: ''
    });
  }

  public applyFilter() {
    if (this.filterForm.value.from && this.filterForm.value.to) {
      if (this.filterForm.value.from < this.filterForm.value.to) {
        const data = {
          from: this.datePipe.transform(this.filterForm.value.from, "yyyy-MM-dd"),
          to: this.datePipe.transform(this.filterForm.value.to, "yyyy-MM-dd"),
        };
        this.dialogRef.close(data);
      } else {
        this.showError('Invalid date range!');
      }

    } else {
      this.showError('Invalid date range!');
    }
  }
  public close() {
    this.dialogRef.close();
  }

  public showError(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['error-red'];
    config.duration = 3000;
    config.verticalPosition = 'top';
    config.horizontalPosition = 'end';
    this.snackBar.open(message, null, config);
  }
}
