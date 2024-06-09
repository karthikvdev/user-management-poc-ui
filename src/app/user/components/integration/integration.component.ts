import { Component, OnInit } from '@angular/core';
import { IUser, UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrl: './integration.component.scss'
})
export class IntegrationComponent {

  public isLoading: boolean = false;
  public columns: string[] = ["S.No", "Name", "Email", "Phone Number", "Address", "Actions"];
  constructor(
    public userService: UserService,
    public matDialog: MatDialog,
  ) {
    this.fetchAllUsers();
  }

  public fetchAllUsers(): void {
    this.userService.getAllUserInfo().subscribe({
      next: (data) => {
        this.userService.userListSubject.next(data?.data);
      },
      error: (err) => {
        console.log("err", err)
      }
    })
  }

  public handleOnCreateUser(user?: IUser): void {
    let dialogRef = this.matDialog.open(FormComponent, {
      width: "50%",
      data: user,
      disableClose: true
    })
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.fetchAllUsers();
      }
    })
  }


}
