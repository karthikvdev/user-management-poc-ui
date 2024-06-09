import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';

interface ISnackBar {
  message: string,
  severity: "success" | "error"
}


@Component({
  selector: 'app-toast-message',
  encapsulation : ViewEncapsulation.None,
  templateUrl: './toast-message.component.html',
  styleUrl: './toast-message.component.scss'
})
export class ToastMessageComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: ISnackBar,
    public snackBar: MatSnackBar
  ) { }
  
  public dismissToast(): void {
    this.snackBar.dismiss();
}
}
