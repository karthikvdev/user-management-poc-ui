import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser, UserService } from '../../services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {

  public userForm!: FormGroup;
  public cancelBtnName: string = "Cancel"
  public defaultValue!: IUser;
  public formLoading: boolean = false;
  constructor(
    public formBuilder: FormBuilder,
    public userService: UserService,
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUser
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: new FormControl(this.data?.name || '', [Validators.required, Validators.pattern(this.userService?.regex.whitespace)]),
      email: new FormControl(this.data?.email || '', [Validators.required, Validators.pattern(this.userService?.regex.email)]),
      phoneNumber: new FormControl(this.data?.phoneNumber || '', [Validators.required, Validators.maxLength(10), Validators.pattern(this.userService?.regex?.phoneNumber)]),
      address: new FormControl(this.data?.address || '', [Validators.required, Validators.pattern(this.userService?.regex.whitespace)]),
    })
  }

  public save() {
    this.userForm?.markAllAsTouched();
    if (Object.values(this.userForm?.controls)?.every((field) => !field?.errors)) {
      this.formLoading = true;
      if (this.data == undefined) {
        this.userService.createUser(this.userForm.value).subscribe({
          next: (response) => {
            this.dialogRef.close({ add: response?.data });
            this.userService.showToastMessage("User created successfully");
          },
          complete: () => {
            this.formLoading = false;
          }
        })
      }
      else {
        this.userService.editUser({ _id: this?.data?._id, ...this.userForm.value }).subscribe({
          next: (response) => {
            this.userService.showToastMessage("User Edited successfully");
            this.dialogRef.close({ edit: response?.data })
          },
          complete: () => {
            this.formLoading = false;
          }
        })
      }
    }

  }

  public cancelEdit(): void {
    this.dialogRef.close()
  }

}
