import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastMessageComponent } from '../../components/toast-message/toast-message.component';
import { HttpService } from './http.service';

export type API_RESPONSE<R = any> = {
  statusCode: number,
  status: "success" | "error",
  message: string,
  data: R
}


export interface IUser {
  name: string;
  email: string;
  phoneNumber: number;
  address: string;
  _id?: string;

}


@Injectable({
  providedIn: 'root'
})

export class UserService {
  readonly baseURL: string = "http://localhost:8080/user";

  readonly regex = {
    whitespace: new RegExp(/(?!^$)([^\s])/),
    email: new RegExp(/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/),
    phoneNumber: new RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/),
  };

  constructor(
    private http: HttpService,
    private snackBar: MatSnackBar
  ) { }

  public userListSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);

  public getAllUserInfo(): Observable<API_RESPONSE<IUser[]>> {
    return this.http.get(`user`)
  }

  public createUser(user: IUser): Observable<API_RESPONSE<IUser>> {
    return this.http.post(`user/create`, user);

  }

  public editUser(user: IUser): Observable<API_RESPONSE<IUser>> {
    return this.http.put(`user/update/` + user._id, user);

  }

  public deleteUser(userId: string): Observable<API_RESPONSE> {
    return this.http.delete(`user/` + userId);
  }

  public downloadPDF(userId: string): Observable<Blob> {
    const options = {
      responseType: "blob"
    }
    return this.http.get(`user/pdf/download/${userId}`, options)
  }

  public viewPdf(userId: string): Observable<API_RESPONSE> {
    return this.http.get(`user/pdf/generate/${userId}`)
  }

  public showToastMessage(msg: string) {
    this.showToast(msg);
  }

  private showToast(message: string) {
    this.snackBar.openFromComponent(ToastMessageComponent, {
      duration: 2 * 1000,
      data: {
        message
      }
    })
  }

}
