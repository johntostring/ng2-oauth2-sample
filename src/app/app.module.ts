import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { provideHttpInterceptor } from './shared/interceptor/http-interceptor-provider';
import { SessionStorageService } from './shared/session-storage.service';
import { UserService } from './shared/user.service';
import { AppRoutingModule, routedComponents } from './app-routing.module';
import { AuthenticatedGuard } from './authenticated.guard';
import { UnauthenticatedGuard } from './unauthenticated.guard';
import { provideAppConfig } from './app.config';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CustomRouteReuseStrategy } from './custom-route-reuse-strategy';
import { RouteReuseStrategy } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { SampleService } from './shared/sample.service';

@NgModule({
  declarations: [
    AppComponent,
    routedComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    UserService,
    SampleService,
    SessionStorageService,
    AuthenticatedGuard,
    UnauthenticatedGuard,
    provideAppConfig(),
    provideHttpInterceptor(),
    {provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
