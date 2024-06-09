import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IUser, UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { DeleteDialogComponent } from '../../../components/delete-dialog/delete-dialog.component';
import { PdfViewComponent } from '../pdf-view/pdf-view.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnChanges {
  @Input() search!: string;
  public isLoading: boolean = false;
  public userList: IUser[] = this.userService?.userListSubject?.value;
  public columns: string[] = ["S.No", "Name", "Email", "Phone Number", "Address", "Actions"];
  constructor(
    public userService: UserService,
    public matDialog: MatDialog
  ) {
    this.fetchAllUsers();
    this.userService.userListSubject.subscribe((data) => {
      this.userList = data;
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['search'] && changes['search'].currentValue) {

    }
  }

  public fetchAllUsers(): void {
    this.userService.getAllUserInfo().subscribe({
      next: (data) => {
        this.userService.userListSubject.next(data?.data);
      },
      error: (err) => {
        console.error("err", err)
      }
    })
  }

  public handleOnEdit(user?: IUser) {
    let dialogRef = this.matDialog.open(FormComponent, {
      width: "50%",
      data: user,
      disableClose: true
    })
    dialogRef.afterClosed().subscribe((data) => {
      this.fetchAllUsers();
    }

    )
  }

  public openViewPdf(pdfUrl: string, user: IUser): void {
    this.matDialog.open(PdfViewComponent, {
      height: "60%",
      width: "60%",
      disableClose: true,
      data: {
        pdfUrl,
        user
      }
    })
  }

  public getPdfUrl(user: IUser): void {
    this.userService.viewPdf(user?._id || '').subscribe({
      next: (data) => {
        this.openViewPdf(data?.data?.pdf, user);
      }
    })
  }

  public deleteUser(user?: IUser) {
    let deleteDialog = this.matDialog.open(DeleteDialogComponent, {
      width: "450px",
      height: "150px"
    });
    deleteDialog.afterClosed().subscribe((data) => {
      if (data) {
        let id = (user && user?._id) ? user?._id : ''
        this.userService.deleteUser(id).subscribe({
          next: (data) => {
            this.fetchAllUsers();
            this.userList = this.userList.filter((userData) => userData?._id !== user?._id);
            this.userService.showToastMessage("User Deleted successfully");
          }
        });
      }
    })

  }
}


