import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatSnackBarModule, MatToolbarModule,MatMenuModule,MatSelectModule } from '@angular/material';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './auth/interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { LeaveComponent } from './leave/leave.component';
import { ErrorinterceptorService } from './auth/errorinterceptor.service';
import { PayslipComponent } from './vault/payslip/payslip.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    HomeComponent,
    LeaveComponent,
    PayslipComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    Ng4LoadingSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatCardModule,
    AppRoutingModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorinterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
