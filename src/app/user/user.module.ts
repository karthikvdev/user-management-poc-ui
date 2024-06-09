import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { IntegrationComponent } from './components/integration/integration.component';
import { UserRoutingModule } from './user-routing.module';
import { FormComponent } from './components/form/form.component';
import { ProgressButtonComponent } from './components/progress-button/progress-button.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './components/table/table.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastMessageComponent } from '../components/toast-message/toast-message.component';
import { PdfDownloadComponent } from './components/pdf-download/pdf-download.component';
import { DeleteDialogComponent } from '../components/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    IntegrationComponent,
    ProgressButtonComponent,
    FormComponent,
    TableComponent,
    ToastMessageComponent,
    PdfDownloadComponent,
    DeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    UserRoutingModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule
  ],
  providers: [
    UserService
  ],
  exports: [
    IntegrationComponent,
    TableComponent
  ]
})
export class UserModule { }
