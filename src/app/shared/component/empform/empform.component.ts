import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomRegex } from 'src/app/const/validator';
import { EmployeeService } from '../../service/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-empform',
  templateUrl: './empform.component.html',
  styleUrls: ['./empform.component.scss'],
})
export class EmpformComponent implements OnInit {
  empForm!: FormGroup;
  education: string[] = [
    'SSC',
    'HSC',
    'Diploma',
    'Graduation',
    'Post Graduation',
  ];
  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _snackbar: SnackbarService,
    private _dialogref: MatDialogRef<EmpformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.createempform();
    this.empForm.patchValue(this.data);
  }

  createempform() {
    this.empForm = this._fb.group({
      firstName: [
        '',
        [Validators.required, Validators.pattern(CustomRegex.onlyText)],
      ],
      lastName: [
        '',
        [Validators.required, Validators.pattern(CustomRegex.onlyText)],
      ],
      email: ['', [Validators.required, Validators.pattern(CustomRegex.email)]],
      contact: [
        '',
        [Validators.required, Validators.pattern(CustomRegex.contact)],
      ],
      exp: ['', [Validators.required, Validators.pattern(CustomRegex.contact)]],
      company: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['female'],
      education: ['', Validators.required],
    });
  }

  get f() {
    return this.empForm.controls;
  }

  onSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        const updateemp = {
          ...this.empForm.value,
        };
        this._empService.updateemployee(this.data.id, updateemp).subscribe({
          next: (res) => {
            this._dialogref.close(true);
            this._empService.triggerRefresh();
            this._snackbar.opensnackbar(`the employee updated successfully`);
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else {
        const newData = {
          ...this.empForm.value,
        };
        this._empService.addemployee(newData).subscribe({
          next: (res) => {
            this._dialogref.close(true);
            this._snackbar.opensnackbar(`the employee Added successfully`);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    }
  }
}
