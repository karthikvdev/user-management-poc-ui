import { Component, Input } from '@angular/core';
import { IUser, UserService } from '../../services/user.service';

@Component({
  selector: 'app-pdf-download',
  templateUrl: './pdf-download.component.html',
  styleUrl: './pdf-download.component.scss'
})
export class PdfDownloadComponent {

  @Input() user!: IUser
  constructor(
    public userService: UserService
  ) { }


  public downloadPDF(): void {
    const options = {
      responseType: "blob"
    }
    this.userService.downloadPDF(this.user?._id || '').subscribe({
      next: (data) => {
        this.handleOnDownload(data);
      }
    })
  }

  public handleOnDownload(response: Blob): void {
    const link: HTMLAnchorElement = document.createElement('a');
    const fileUrl: string = URL?.createObjectURL(response);
    document.body.appendChild(link);
    link.setAttribute('style', 'display: none;');
    link.href = fileUrl;
    link.download = this.user?.name;
    link.click();
    window?.URL?.revokeObjectURL(link?.href);
    link.remove();
  }

}
