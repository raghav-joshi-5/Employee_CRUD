import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../../service/employee.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EmpformComponent } from '../empform/empform.component';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _empService: EmployeeService,
    private _matdialog: MatDialog,
    private _snackbar: SnackbarService
  ) {}
  ngOnInit(): void {
    this.getemployee();
    this._empService.refresh$.subscribe(() => {
      this.getemployee();
    });
  }

  getemployee() {
    this._empService.getemployee().subscribe({
      next: (res) => {
        const employees = Object.keys(res).map((key) => ({
          id: key,
          ...res[key],
        }));

        this.dataSource = new MatTableDataSource(employees);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'contact',
    'exp',
    'company',
    'dob',
    'gender',
    'education',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(arg0: any) {
    const getConfirm = confirm(`are you sure you want to remove this employee`);
    this._empService.deletemployee(arg0).subscribe({
      next: (res) => {
        this.getemployee();
        this._snackbar.opensnackbar(`employee deleted successfully`);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  editEmployee(arg0: any) {
    const matdialogref = this._matdialog.open(EmpformComponent, { data: arg0 });
    this._empService.refresh$.subscribe(() => {
      this.getemployee();
    });
  }
}
