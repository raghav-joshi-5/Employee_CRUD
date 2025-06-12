import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpformComponent } from '../empform/empform.component';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed = true;
  constructor(
    private _matdialog: MatDialog,
    private _empService: EmployeeService
  ) {}

  ngOnInit(): void {}

  opendialog() {
    let matdialogref = this._matdialog.open(EmpformComponent);
    matdialogref.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this._empService.triggerRefresh();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
