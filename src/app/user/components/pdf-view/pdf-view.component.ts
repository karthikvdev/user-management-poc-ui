import { Component, Inject, Input } from '@angular/core';
import { IUser } from '../../services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

export interface IPdfViewComponentData {
  pdfUrl: string,
  user: IUser
}

@Component({
  selector: 'app-pdf-view',
  standalone: true,
  imports: [],
  templateUrl: './pdf-view.component.html',
  styleUrl: './pdf-view.component.scss'
})

export class PdfViewComponent {

  @Input() user!: IUser;
  public pdfUrl!: SafeUrl;
  constructor(
    public matDialogRef: MatDialogRef<PdfViewComponent>,
    private domSanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: IPdfViewComponentData
  ) {
    this.pdfUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(data?.pdfUrl);
  }

  public handleClose(): void {
    this.matDialogRef.close();
  }
}
