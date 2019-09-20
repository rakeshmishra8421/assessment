import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilterComponent } from './shared/filter/filter.component';
import { DatePipe } from '@angular/common';
import { DateUtils } from './shared/date.util';
import { AppService } from './app.service';
import { MatSnackBarConfig, MatSnackBar, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  errMsg: string;
  records: MatTableDataSource<any>;
  displayedColumns: string[] = [
    '#', 'title', 'datetime', 'status', 'recipients', 'Sent', 'Opened', 'Clicked', 'Bounced', 'Complaint', 'Unsubscribe', 'reject', 'All', 'action'
  ];
  diffDays: number;
  @ViewChild(MatSort, { static: false }) 
  set content(sort: MatSort) {
    if(this.records) {
      this.records.sort = sort;
    }
    
  }
  multi: any[] = [];
  results: any[] = [];
  view: any[] = [1000,];
  colorScheme = {
    domain: ['#bfff00', '#c0d95e', '#bab487', '#ad8ea8', '#9868c6', '#7340e3', '#0c00ff', '#808080']
  }
  gradient = true;
  showLegend = true;
  tableShown: boolean;
  constructor(
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private appService: AppService,
    private snackBar: MatSnackBar,
    private changeDetectorRef: ChangeDetectorRef) {
  }
  ngOnInit(): void {
    this.getLatestData();
  }
  getLatestData() {
    const data = {
      to: this.datePipe.transform(DateUtils.getDateToday(), 'yyyy-MM-dd'),
      from: this.datePipe.transform(DateUtils.getLastMonth(), 'yyyy-MM-dd'),
    };
    this.getDashboardData(data);
  }
  getDashboardData(data: { from: string; to: string; }) {

    const endDate = new Date(data.to).getTime();
    const startDate = new Date(data.from).getTime();
    this.diffDays = (endDate - startDate) / (1000 * 3600 * 24);
    this.appService.sendQuery(data).subscribe(
      (res: any) => {
        if (res && res.length) {
          this.tableShown = true;
          this.records = new MatTableDataSource<any>(res);
          let keys = Object.keys(res[0].report);
          this.multi = [];
          for (let i = 0; i < keys.length; i++) {
            let series = [];
            for (let j = 0; j < res.length; j++) {
              const seriesData = {
                name: res[j].title,
                value: res[j].report[keys[i]]
              }
              series.push(seriesData);
            }
            const obj = {
              name: keys[i],
              series: series
            }
            this.multi.push(obj)
          }
          this.changeDetectorRef.detectChanges();
          this.results = this.multi;
        } else {
          this.tableShown = false;
          this.showError('No data available for this range!');
        }
      },
      err => {
        console.log(err);
        this.errMsg = '';
        if (err.constructor === Array) {
          err.forEach(msg => {
            this.errMsg += msg.errorMessage;
          });
        } else {
          this.errMsg = err;
        }
        this.showError(this.errMsg);
      }
    );
  }
  public openFilter() {
    const dialogRef = this.dialog.open(FilterComponent, {
      maxWidth: '80vw',
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getDashboardData(res);
      }
    });
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
