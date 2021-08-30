import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertComponent } from './shared/components/alert/alert.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { AccessControlDirective } from './core/directives/access-control.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthChildGuard } from './core/guards/auth-child.guard';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SideBarComponent } from './core/side-bar/side-bar.component';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { NoRecordsFoundComponent } from './shared/components/no-records-found/no-records-found.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    ToastComponent,
    AccessControlDirective,
    SideBarComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    AuthGuard,
    AuthChildGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
